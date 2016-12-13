#pragma strict

public var column : Transform;
public var speed: float;
public var spawnRate: float;

private var brickHeight : float;
private var leftBound: Plane;
private var childSizeX: float;

function Start () {
  this.leftBound = GeometryUtility.CalculateFrustumPlanes(GameObject.Find("MainCamera").GetComponent(Camera))[0];
  this.brickHeight = 1.18;
  this.childSizeX = column.Find("Upper").GetComponent(Renderer).bounds.size.x;
  InvokeRepeating("SpawnColumn", 0, spawnRate);
}

function Update () {
  var childCount:int = this.transform.childCount;
  var i: int;

	for(i = 0 ; i < childCount ; i++){
    var column : Transform = this.transform.GetChild(i);
    column.localPosition.x -= Time.deltaTime*speed;
  }

  if(childCount > 0){
    var firstColumn : Transform = this.transform.GetChild(0);
    if(firstColumn.position.x + this.childSizeX/2 < -this.leftBound.distance){
      Destroy(firstColumn.gameObject);
    }
  }

}

function SpawnColumn(){
  var randomHeight : int = Mathf.CeilToInt(Random.Range(0, 4.0f));
  var column : Transform = Instantiate(column, transform).transform;
  column.position.y -= brickHeight*randomHeight;
}