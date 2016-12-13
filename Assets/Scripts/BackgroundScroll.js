#pragma strict

public var speed: float;

private var leftBound: Plane;
private var children: Transform[];
private var currentChild: int;
private var childSizeX: float;

function Start () {
  this.leftBound = GeometryUtility.CalculateFrustumPlanes(GameObject.Find("MainCamera").GetComponent(Camera))[0];
  this.children = new Array(this.transform.GetChild(0), this.transform.GetChild(1));
  this.currentChild = 0;
  this.childSizeX = this.children[0].GetComponent(Renderer).bounds.size.x;
}

function Update () {

  var step = Time.deltaTime*speed;
  this.children[0].localPosition.x -= step;
  this.children[1].localPosition.x -= step;

  if(this.children[currentChild].position.x + this.childSizeX/2 < -this.leftBound.distance){
    var nextChild : int = currentChild ? 0: 1;
    this.children[currentChild].position.x = this.children[nextChild].position.x + this.childSizeX;
    this.currentChild = nextChild;
  }
 
}