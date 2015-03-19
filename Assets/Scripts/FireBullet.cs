using UnityEngine;
using System.Collections;


public class FireBullet : MonoBehaviour {

	// Public variable 
	public int speed  = 6;
	
	// Gets called once when the bullet is created
	void Start () {  
		// Set the Y velocity to make the bullet move upward
		GetComponent<Rigidbody2D>().velocity = 
			GameObject.Find ("StartPoint").transform.up * speed;
			//Vector3.up * speed;
			//.Set (rigidbody2D.velocity.x, speed);
	}
	
	// Gets called when the object goes out of the screen
	void OnBecameInvisible() {  
		// Destroy the bullet 
		Destroy(gameObject);
	}

	void OnTriggerEnter2D( Collider2D other )
	{
		if (other.CompareTag ("zombie")) {
			other.GetComponent<ZombieController>().BulletHit();

			Debug.Log ("Hit " + other.gameObject);
			DestroyObject( gameObject );
		}
	}

	// Update is called once per frame
	void Update () {
	
	}
}
