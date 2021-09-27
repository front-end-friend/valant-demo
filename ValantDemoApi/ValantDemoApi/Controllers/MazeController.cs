using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;
using ValantDemoApi.Models;
using ValantDemoApi.Services;
using ValantDemoApi.Dtos;
using System.Linq;
using System;

namespace ValantDemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MazeController : ControllerBase
    {
        private readonly IMemoryCache _cache;
        private readonly ILogger<MazeController> _logger;
        private MazeService _mazeService;


        public MazeController(ILogger<MazeController> logger, IMemoryCache cache)
        {
            _logger = logger;
            _cache = cache;
            this._mazeService = new MazeService(_cache);
        }


        [HttpGet("mazes")]
        public IEnumerable<MazeInfoDto> GetAvailableMazes()
        {
          return this._mazeService.GetMazes().Select(maze => new MazeInfoDto(maze.Id, maze.Title));
        }

        // create session
        [HttpGet("mazes/{mazeId}")]
        public MazeSession CreateMazeSession(long mazeId)
        {
          return this._mazeService.CreateSession(mazeId);
        }
        // map to dto
        // return session id, user pos, maze

        // check if won

        // move user pos
        [HttpGet("session/{sessionId}/move/{direction}")]
        public Position SetPlayerMove(long sessionId, string direction)
        {
          return this._mazeService.MoveUserInDirection(sessionId, MapDirection(direction));
        }

        // get user pos



        // get available moves
        [HttpGet("session/{sessionId}/moves")]
        public IEnumerable<string> GetNextAvailableMoves(long sessionId)
        {
          return this._mazeService.GetAvailableMoves(sessionId).Select(direction => direction.ToString());
        }

        // create maze

        private Direction MapDirection(string value) {
          if (value == "Left") return Direction.Left;
          if (value == "Right") return Direction.Right;
          if (value == "Up") return Direction.Up;
          return Direction.Down;
        }
    }
}
