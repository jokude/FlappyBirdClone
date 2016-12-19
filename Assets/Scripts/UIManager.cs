using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class UIManager : MonoBehaviour {

  private bool isPaused;
  private bool isOver;

  private static bool isCreated = false;
  private GameObject startText;
  private GameObject scorePanel;
  private Text panelText;
  private int scoreCount;
  private AudioSource audioSource;

  void Awake(){
    if(!isCreated){
      DontDestroyOnLoad(this.gameObject);
      isCreated = true;
    } else {
      Destroy(this.gameObject);
    }
  }

	void Start () {
    Time.timeScale = 0;
    this.isPaused = true;
    this.isOver = false;
    this.startText = GameObject.Find("StartText");
    this.panelText = (Text) GameObject.Find("ScoreCount").GetComponent(typeof(Text));
    this.scorePanel = GameObject.Find("ScorePanel");
    this.audioSource = this.GetComponent<AudioSource>();
    this.scorePanel.SetActive(false);
	}
	
  void Update () {
    if (this.isPaused && Input.GetKeyDown("space")){
      if(this.isOver){
        SceneManager.LoadScene("Main");
      }
      this.StartGame();
    }
  }

  void StartGame() {
    Time.timeScale = 1;
    this.scoreCount = 0;
    this.SetScore();
    this.isPaused = false;
    this.startText.SetActive(false);
    this.scorePanel.SetActive(true);
    this.audioSource.Play();
  }

  public void StopGame() {
    Time.timeScale = 0;
    this.isPaused = true;
    this.isOver = true;
    this.startText.GetComponent<Text>().text = "Your score is " + this.scoreCount.ToString() + ".\nPress Space to try again.";
    this.scorePanel.SetActive(false);
    this.startText.SetActive(true);
    this.audioSource.Stop();
  }

  public void IncreaseScore() {
    this.scoreCount++;
    this.SetScore();
  }

  private void SetScore() {
    this.panelText.text = this.scoreCount.ToString();
  }
}
