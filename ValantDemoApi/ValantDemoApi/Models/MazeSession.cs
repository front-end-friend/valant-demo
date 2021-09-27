using System.Collections.Generic;

namespace ValantDemoApi.Models
{
  public class MazeSession
  {
    public MazeSession(
      long Id,
      long MazeId,
      int Width,
      int Height,
      Position Start,
      Position End,
      int[][] Tiles
    ){
      this.Id = Id;
      this.MazeId = MazeId;
      this.Start = Start;
      this.Width = Width;
      this.Height = Height;
      this.End = End;
      this.Tiles = Tiles;

      this.UserPosition = Start;
    }

    public long Id { get; }
    public long MazeId { get; }
    public int Width { get; }
    public int Height { get; }
    public Position Start { get; }
    public Position End { get; }
    public Position UserPosition { get; set; }
    public int[][] Tiles { get; }
  }
}
