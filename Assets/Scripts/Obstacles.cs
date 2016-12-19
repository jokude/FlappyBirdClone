using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Obstacles : MonoBehaviour {

  public Transform column;
  public float speed;
  public float spawnRate;

  private Plane leftBound;
  private float brickHeight;
  private float childSizeX;

	void Start () {
    this.leftBound = GeometryUtility.CalculateFrustumPlanes(GameObject.Find("MainCamera").GetComponent<Camera>())[0];
    this.brickHeight = 1.18f;
    this.childSizeX = column.Find("Upper").GetComponent<Renderer>().bounds.size.x;
    InvokeRepeating("SpawnColumn", 0, spawnRate);
	}
	
	void Update () {
    
    foreach(Transform child in this.transform){
      child.Translate(Vector2.left*(Time.deltaTime*speed));
    }

    if(this.transform.childCount > 0){
      Transform firstColumn = this.transform.GetChild(0);
      if(firstColumn.position.x + this.childSizeX/2 < -this.leftBound.distance){
        Destroy(firstColumn.gameObject);
      }
    }
	}

  private void SpawnColumn(){
    int randomHeight = Mathf.CeilToInt(Random.Range(0, 4.0f));
    Transform column = Instantiate(this.column, transform).transform;
    column.Translate(Vector2.down*(brickHeight*randomHeight));
  }
}
