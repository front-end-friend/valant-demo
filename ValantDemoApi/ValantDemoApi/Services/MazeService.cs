using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using ValantDemoApi.Models;
using ValantDemoApi.Dtos;

using System;


namespace ValantDemoApi.Services {
  public class MazeService {
    public static string CacheKeyMazeSessions => "_MazeSessions";
    public static string CacheKeyMazes => "_Mazes";
    private static long _mazeIdSeed = 0;
    private static long _sessionId = 0;

    private IMemoryCache _cache;

    public MazeService(IMemoryCache cache) {
      this._cache = cache;
    }

    private Dictionary<long, Maze> GetCachedMazes() {
      Dictionary<long, Maze> cacheEntry;
      if(!_cache.TryGetValue(CacheKeyMazes, out cacheEntry))
      {
        cacheEntry = DefaultMazes();
        var cacheEntryOptions = new MemoryCacheEntryOptions()
          .SetSlidingExpiration(TimeSpan.FromMinutes(10));
        _cache.Set(CacheKeyMazes, cacheEntry, cacheEntryOptions);
      }
      return cacheEntry;
    }

    private Dictionary<long, MazeSession> GetCachedMazesSessions() {
      Dictionary<long, MazeSession> cacheEntry;
      if(!_cache.TryGetValue(CacheKeyMazeSessions, out cacheEntry))
      {
        cacheEntry = new Dictionary<long, MazeSession>();
        var cacheEntryOptions = new MemoryCacheEntryOptions()
          .SetSlidingExpiration(TimeSpan.FromMinutes(10));
        _cache.Set(CacheKeyMazeSessions, cacheEntry, cacheEntryOptions);
      }
      return cacheEntry;
    }

    private Dictionary<long, Maze> DefaultMazes() {
        Dictionary<long, Maze> defaultMazes = new Dictionary<long, Maze>();
        defaultMazes.Add(_mazeIdSeed,
          new Maze(_mazeIdSeed, "L-Shape Maze",
            "SXXXX\nOXXXX\nOXXXX\nOXXXX\nOOOOE")
        );
        _mazeIdSeed++;
        defaultMazes.Add(_mazeIdSeed,
          new Maze(_mazeIdSeed, "Corner Maze",
          "SOOOO\nOXXXO\nOXXXO\nOXXXO\nOOOOE")
        );
        _mazeIdSeed++;
        defaultMazes.Add(_mazeIdSeed,
          new Maze(_mazeIdSeed, "Open Maze",
          "SOOOO\nOOOOO\nOOOOO\nOOOOO\nOOOOE")
        );
        _mazeIdSeed++;
        defaultMazes.Add(_mazeIdSeed,
          new Maze(_mazeIdSeed, "Zig-Zag Maze",
          "SOXXX\nXOOXX\nXXOOX\nXXXOO\nXXXXE")
        );
        _mazeIdSeed++;
        return defaultMazes;
    }

    public MazeSession CreateSession(long mazeId) {
      Console.WriteLine("creating session");
      Dictionary<long, Maze> mazes = GetCachedMazes();
      Dictionary<long, MazeSession> sessions = GetCachedMazesSessions();
      if (!mazes.ContainsKey(mazeId)) {
        // throw some kind of error
        return null;
      }
      long sessionId = ++_sessionId;
      Maze maze = mazes[mazeId];

      Position start = null;
      Position end = null;
      string[] rows = maze.Content.Split(
        new[] { Environment.NewLine },
        StringSplitOptions.None
      );
      int[][] tiles = rows.Select(row => row.ToCharArray().Select(c => this.ParseTileType(c + "")).ToArray()).ToArray();

      for (int y = 0; y < tiles.Length; y++) {
        for (int x = 0; x < tiles[0].Length; x++) {
          Position pos = new Position(x, y);
          if (tiles[y][x] == 0) start = pos;
          if (tiles[y][x] == 1) end = pos;
        }
      }

      sessions.Add(sessionId, new MazeSession(
        sessionId,
        mazeId,
        tiles[0].Length,
        tiles.Length,
        start,
        end,
        tiles
      ));

      return sessions[sessionId];
    }

    // with a session Id, check the availableMoves for user
    public List<Direction> GetAvailableMoves(long sessionId) {
      MazeSession session = GetSession(sessionId);
      if (session == null) return new List<Direction>();

      List<Direction> directions = new List<Direction> {
        Direction.Up,
        Direction.Down,
        Direction.Left,
        Direction.Right
      };

      return directions.Where(direction => {
        Position posInDirection = this.To(session.UserPosition, direction);
        return this.WithinBounds(session, posInDirection) &&
        session.Tiles[posInDirection.Y][posInDirection.X] != 3;
      }).ToList();
    }

    // with a session Id, pass direction to move user

    public Position MoveUserInDirection(long sessionId, Direction direction) {
      List<Direction> availableMoves = this.GetAvailableMoves(sessionId);
      MazeSession session = this.GetSession(sessionId);

      if (availableMoves.Where(move => move == direction).ToList().Count > 0) {
        session.UserPosition = this.To(session.UserPosition, direction);
        return session.UserPosition;
      }
      // handle error here, invalid move
      return null;
    }

    // get a position back
    public Position GetUserPosition(long sessionId) {
      return this.GetSession(sessionId).UserPosition;
    }

    // with a session Id, check if the user has won
    public bool HasUserReachedEnd(long sessionId) {
      MazeSession session = this.GetSession(sessionId);
      return session.UserPosition.Equals(session.End);
    }

    private MazeSession GetSession(long sessionId) {
      Dictionary<long, MazeSession> sessions = GetCachedMazesSessions();
      if (!sessions.ContainsKey(sessionId)) {

        Console.WriteLine("session doesn't exist");
        return null;
        // throw an error, session doesn't exist
      }

      return sessions[sessionId];
    }

    // get mazes as a list
    public List<Maze> GetMazes() {
      Dictionary<long, Maze> mazes = GetCachedMazes();
      return mazes.Values.ToList();
    }

    private bool WithinBounds(MazeSession session, Position pos) {
      return pos.X >= 0 && pos.X < session.Tiles[0].Length &&
              pos.Y >= 0 && pos.Y < session.Tiles.Length;
    }




    // Create Maze

    // Validate String Content with the following
    // * At Least / Only 1 Start
    // * At Least / Only 1 End
    // * Must Be Dimensions 5 * 5
    // * Must Be Valid path connecting Start/End


    private int ParseTileType(string s) {
      if (s == "S") return 0;
      if (s == "E") return 1;
      if (s == "O") return 2;
      if (s == "X") return 3;
      return -1;
    }

    private Position To(Position pos, Direction to) {
      switch (to)
      {
        case Direction.Up:
          return new Position(pos.X, pos.Y - 1);
        case Direction.Down:
          return new Position(pos.X, pos.Y + 1);
        case Direction.Left:
          return new Position(pos.X - 1, pos.Y);
        case Direction.Right:
          return new Position(pos.X + 1, pos.Y);
        default:
          return null;
      }
    }


  }

  // convert Maze to MazeSession, unpacking

  // Checking for available moves

  // updating map session with User Position from direction

}
