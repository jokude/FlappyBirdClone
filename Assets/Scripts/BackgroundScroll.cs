using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BackgroundScroll : MonoBehaviour {

  public float scrollSpeed;

  private Plane leftBound;
  private Transform[] children;
  private int currentChild;
  private float childSizeX;

	void Start () {
    this.leftBound = GeometryUtility.CalculateFrustumPlanes(GameObject.Find("MainCamera").GetComponent<Camera>())[0];
    this.children = new Transform[2];
    this.children[0] = this.transform.GetChild(0);
    this.children[1] = this.transform.GetChild(1);
    this.currentChild = 0;
    this.childSizeX = this.children[0].GetComponent<Renderer>().bounds.size.x;
	}
	
	void Update () {
    float step = Time.deltaTime*scrollSpeed;
    this.children[0].Translate(Vector2.left*step);
    this.children[1].Translate(Vector2.left*step);

    if(this.children[this.currentChild].position.x + this.childSizeX/2 < -this.leftBound.distance){ 
      int nextChild = this.currentChild == 1 ? 0: 1;
      this.children[this.currentChild].Translate(Vector2.right*(this.childSizeX*2));
      this.currentChild = nextChild;
    }
	}
}