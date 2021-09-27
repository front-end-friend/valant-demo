namespace ValantDemoApi.Models {
  public class Position {
    public Position(int X, int Y) {
      this.X = X;
      this.Y = Y;
    }

    public int X { get; set; }
    public int Y { get; set; }

    public bool Equals(Position o) {
      return this.X == o.X && this.Y == o.Y;
    }
  }
}
