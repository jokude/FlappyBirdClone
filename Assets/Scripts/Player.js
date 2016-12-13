#pragma strict

public var jumpSpeed: float;

private var body: Rigidbody;
private var animationManager: Animator;
private var soundManager : SoundManager;
private var uiManager : StateManager;

function Start () {
  this.body = this.GetComponent(Rigidbody);
  this.animationManager = this.GetComponent(Animator);
  this.soundManager = SoundManager.Instance();
  this.uiManager = GameObject.Find("UI").GetComponent(StateManager);
}

function Update () {
  if (Input.GetKeyDown("space")){
    this.body.velocity.y = 0;
    this.body.AddForce(0, this.jumpSpeed * Time.deltaTime, 0, ForceMode.Impulse);
    this.animationManager.Play("Fly");
    this.soundManager.Play(SoundManager.Clips.FLAP);
  }
}

function OnTriggerEnter(collider : Collider) {

  var tag = collider.gameObject.tag;

  if(tag == "Danger"){
    this.soundManager.Play(SoundManager.Clips.GAMEOVER);
    uiManager.StopGame();
  } else if(tag == "Score"){
    this.soundManager.Play(SoundManager.Clips.SCORE);
    uiManager.IncreaseScore();
  }
}