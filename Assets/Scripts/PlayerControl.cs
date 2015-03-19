using UnityEngine;
using System.Collections;

public class PlayerControl : MonoBehaviour {

	public GameObject bullet;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetButton ("Fire1")) {
			Vector3 pos = GameObject.Find ("FirePoint").transform.position;
			Quaternion rotation = GameObject.Find ("FirePoint").transform.rotation;
			Instantiate(bullet, pos, rotation) ;
		}
	}

	void OnTriggerEnter2D( Collider2D other )
	{
		//if(other.CompareTag("zombie")) {
		//	GameObject.Find ("StartPoint").GetComponent<CameraMove> ().livesLeft--;
		//other.Get
	}

}

