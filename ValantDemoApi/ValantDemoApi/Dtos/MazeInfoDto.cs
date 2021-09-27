namespace ValantDemoApi.Dtos
{
  public class MazeInfoDto
  {
    public MazeInfoDto(long Id, string Title) {
      this.Id = Id;
      this.Title = Title;
    }
    public long Id { get; set; }
    public string Title { get; set; }
  }
}
