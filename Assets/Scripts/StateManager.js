#pragma strict

import SceneManagement;

public var Player : GameObject;

private var isPaused:boolean;
private var isOver:boolean;
private var startText:GameObject;
private var scorePanel:GameObject;
private var panelText : UI.Text;
private var scoreCount: int;
private var soundManager : SoundManager;

public function Start():void {
  Time.timeScale = 0;
  this.isPaused = true;
  this.isOver = false;
  this.scoreCount = 0;
  this.startText = this.gameObject.Find("StartText");
  this.panelText = this.gameObject.Find("ScoreCount").GetComponent(UI.Text);
  this.scorePanel = this.gameObject.Find("ScorePanel");

  this.soundManager = SoundManager.Instance();
  this.scorePanel.SetActive(false);
}

function Update () {
  if (this.isPaused && Input.GetKeyDown("space")){
    if(this.isOver){
      SceneManager.LoadScene("Main");
    } else {
      this.StartGame();
    }
  }
}

private function StartGame():void {
  Time.timeScale = 1;
  this.isPaused = false;
  this.startText.SetActive(false);
  this.scorePanel.SetActive(true);
  this.soundManager.Play(SoundManager.Clips.MAINTHEME);
}

public function StopGame():void {
  Time.timeScale = 0;
  this.isPaused = true;
  this.startText.GetComponent(UI.Text).text = String.Concat("Your score is ", this.scoreCount.ToString(), ".\nPress Space to try again.");
  this.scorePanel.SetActive(false);
  this.startText.SetActive(true);
  this.isOver = true;
  this.soundManager.Stop(SoundManager.Clips.MAINTHEME);
}

public function IncreaseScore():void {
    this.scoreCount++;
    this.panelText.text = this.scoreCount.ToString();
}
