namespace ValantDemoApi.Models
{
  public class Maze
  {
    public Maze(long Id, string Title, string Content) {
      this.Id = Id;
      this.Title = Title;
      this.Content = Content;
    }
    public long Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
  }
}
