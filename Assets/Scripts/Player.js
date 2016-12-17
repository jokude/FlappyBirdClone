#pragma strict

public var jumpSpeed: float;
public var scoreClip: AudioClip;
public var gameOverClip: AudioClip;
public var flapClip: AudioClip;

private var body: Rigidbody2D;
private var animationManager: Animator;
private var uiManager : UIManager;
private var audioSource : AudioSource;

function Start () {
  this.body = this.GetComponent(Rigidbody2D);
  this.animationManager = this.GetComponent(Animator);
  this.audioSource = this.GetComponent(AudioSource);
  this.uiManager = GameObject.Find("UI").GetComponent(UIManager);
}

function Update () {
  if (Input.GetKeyDown("space")){
    this.body.velocity.y = 0;
    this.body.AddForce(Vector2.up * this.jumpSpeed * Time.deltaTime, ForceMode2D.Impulse);
    this.animationManager.Play("Fly");
    this.audioSource.PlayOneShot(this.flapClip, 0.8f);
  }
}

function OnTriggerEnter2D(collider: Collider2D) {

  var tag: String = collider.gameObject.tag;

  if(tag == "Danger"){
    this.audioSource.PlayOneShot(this.gameOverClip, 0.8f);
    uiManager.StopGame();
  } else if(tag == "Score"){
    this.audioSource.PlayOneShot(this.scoreClip, 1.0f);
    uiManager.IncreaseScore();
  }
}