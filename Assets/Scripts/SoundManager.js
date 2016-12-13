#pragma strict

private var scoreSource:AudioSource;
private var gameOverSource:AudioSource;
private var flapSource:AudioSource;
private var mainThemeSource:AudioSource;

public class SoundManager {

  public enum Clips { MAINTHEME, SCORE, GAMEOVER, FLAP };
  private static var instance:SoundManager = null;
  private static var gameObject:GameObject = null;

  protected function SoundManager() {}

  public static function Instance():SoundManager {
    if(instance == null){
      this.gameObject = new GameObject();
      this.instance = new SoundManager();
      this.instance.LoadClips();
    }
    return this.instance;
  }

  public function AddAudio(clip:AudioClip, loop:boolean, volume:float):AudioSource {
    var audioSource:AudioSource = this.gameObject.AddComponent(AudioSource);
    audioSource.clip = clip;
    audioSource.loop = loop;
    audioSource.volume = volume;
    return audioSource;
  }

  public function Play(clip:int):void {
    this.GetAudioSource(clip).Play();
  }

  public function Stop(clip:int):void {
    this.GetAudioSource(clip).Stop();
  }

  private function LoadClips():void {
    this.scoreSource = this.AddAudio(Resources.Load("Sounds/Score") as AudioClip, false, 1.0f);
    this.gameOverSource = this.AddAudio(Resources.Load("Sounds/GameOver") as AudioClip, false, 0.8f);
    this.flapSource = this.AddAudio(Resources.Load("Sounds/Flap") as AudioClip, false, 0.8f);
    this.mainThemeSource = this.AddAudio(Resources.Load("Sounds/MainTheme") as AudioClip, true, 0.6f);
  }

  private function GetAudioSource(clip:int):AudioSource {
    var source:AudioSource = null;
    switch(clip){
      case SoundManager.Clips.SCORE:
        source = this.scoreSource;
        break;
      case SoundManager.Clips.GAMEOVER:
        source = this.gameOverSource;
        break;
      case SoundManager.Clips.FLAP:
        source = this.flapSource;
        break;
      case SoundManager.Clips.MAINTHEME:
        source = this.mainThemeSource;
    }
    return source;
  }

}