using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour {

  public float jumpSpeed;
  public AudioClip scoreClip;
  public AudioClip gameOverClip;
  public AudioClip flapClip;

  private Rigidbody2D body;
  private Animator animationManager;
  private UIManager uiManager;
  private AudioSource audioSource;

	void Start () {
    this.body = this.GetComponent<Rigidbody2D>();
    this.animationManager = this.GetComponent<Animator>();
    this.audioSource = this.GetComponent<AudioSource>();
    this.uiManager = GameObject.Find("UI").GetComponent<UIManager>();
	}

	void Update () {
    if (Input.GetKeyDown("space")){
      this.body.velocity = Vector2.zero;
      this.body.AddForce(Vector2.up * this.jumpSpeed * Time.deltaTime, ForceMode2D.Impulse);
      this.animationManager.Play("Fly");
      this.audioSource.PlayOneShot(this.flapClip, 0.8f);
    }
	}

  void OnTriggerEnter2D(Collider2D collider) {

    string tag = collider.gameObject.tag;

    if(tag == "Danger"){
      this.audioSource.PlayOneShot(this.gameOverClip, 0.8f);
      this.uiManager.StopGame();
    } else if(tag == "Score"){
      this.audioSource.PlayOneShot(this.scoreClip, 1.0f);
      this.uiManager.IncreaseScore();
    }
  }
}
