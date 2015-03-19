using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ZombieController : MonoBehaviour {

	public float moveSpeed = 1.5f;
	public float turnSpeed = 1.5f;

	private int lives = 3;

	public AudioClip enemyContactSound;
	public AudioClip catContactSound;

	private bool isInvincible = false;
	private float timeSpentInvincible;

	private List<Transform> congaLine = new List<Transform>();

	private Vector3 moveDirection;

	[SerializeField]
	private PolygonCollider2D[] colliders;
	private int currentColliderIndex = 0;


	// Use this for initialization
	void Start () {
		moveDirection = Vector3.right;
	}
	
	// Update is called once per frame
	void Update () {

		if (!GetComponent<Animator>().GetBool( "BulletHit" )) {

		// 1
		Vector3 currentPosition = transform.position;
		// 2
		//if( Input.GetButton("Fire1") ) {
			// 3
			Vector3 moveToward = GameObject.Find("player").transform.position;
				//transform.Find ("player").transform.position;
			//Camera.main.ScreenToWorldPoint( Input.mousePosition );
			// 4
			moveDirection = moveToward - currentPosition;
			moveDirection.z = 0; 
			moveDirection.Normalize();
		//}

		Vector3 target = moveDirection * moveSpeed + currentPosition;
		transform.position = Vector3.Lerp( currentPosition, target, Time.deltaTime );

		float targetAngle = Mathf.Atan2(moveDirection.y, moveDirection.x) * Mathf.Rad2Deg;
		//GetComponent<Rigidbody2D>().
				transform.rotation =
			Quaternion.Slerp( 
				                 //GetComponent<Rigidbody2D>().
				                 transform.rotation, 
			                 Quaternion.Euler( 0, 0, targetAngle ), 
			                 turnSpeed * Time.deltaTime );

		EnforceBounds();
		//1
		}

		if (isInvincible)
		{
			//2
			timeSpentInvincible += Time.deltaTime;
			
			//3
			if (timeSpentInvincible < 3f) {
				float remainder = timeSpentInvincible % .3f;
				GetComponent<Renderer>().enabled = remainder > .15f; 
			}
			//4
			else {
				GetComponent<Renderer>().enabled = true;
				isInvincible = false;
			}
		}
	}

	public void ZombieDestroy () {
		DestroyObject( gameObject );
		GameObject.Find ("StartPoint").GetComponent<CameraMove> ().zombiesLeft--;
		GameObject.Find ("StartPoint").GetComponent<CameraMove> ().livesLeft--;

	}

	public void BulletHit() {
		GetComponent<Collider2D>().enabled = false;
		GetComponent<Animator>().SetBool( "BulletHit", true );
		GetComponent<Animator> ().applyRootMotion = false;
	}

	public void SetColliderForSprite( int spriteNum )
	{
		colliders[currentColliderIndex].enabled = false;
		currentColliderIndex = spriteNum;
		colliders[currentColliderIndex].enabled = true;
	}

	void OnTriggerEnter2D( Collider2D other )
	{
		if(other.CompareTag("player")) {
			GetComponent<Collider2D>().enabled = false;
			GetComponent<Animator>().SetBool( "BulletHit", true );
			GetComponent<Animator> ().applyRootMotion = false;

			//Transform followTarget = congaLine.Count == 0 ? transform : congaLine[congaLine.Count-1];
			//other.transform.parent.GetComponent<CatController>().JoinConga( followTarget, moveSpeed, turnSpeed );
			//congaLine.Add( other.transform );
			//audio.PlayOneShot(catContactSound);
		}
/*		else if(!isInvincible && other.CompareTag("enemy")) {
			audio.PlayOneShot(enemyContactSound);
			isInvincible = true;
			timeSpentInvincible = 0;
			for( int i = 0; i < 2 && congaLine.Count > 0; i++ )
			{
				int lastIdx = congaLine.Count-1;
				Transform cat = congaLine[ lastIdx ];
				congaLine.RemoveAt(lastIdx);
				cat.parent.GetComponent<CatController>().ExitConga();
			}
			if (--lives <= 0) {
				Application.LoadLevel("LooseScene");
			}

		}
		if (congaLine.Count >= 8) {
			Application.LoadLevel("WinScene");
		}*/
	}

	private void EnforceBounds()
	{
		// 1
		Vector3 newPosition = transform.position; 
		Camera mainCamera = Camera.main;
		Vector3 cameraPosition = mainCamera.transform.position;
		
		// 2
		float xDist = mainCamera.aspect * mainCamera.orthographicSize; 
		float xMax = cameraPosition.x + xDist;
		float xMin = cameraPosition.x - xDist;
		
		// 3
		if ( newPosition.x < xMin || newPosition.x > xMax ) {
			newPosition.x = Mathf.Clamp( newPosition.x, xMin, xMax );
			moveDirection.x = -moveDirection.x;
		}
		// TODO vertical bounds
		float yMax = mainCamera.orthographicSize;
		
		if (newPosition.y < -yMax || newPosition.y > yMax) {
			newPosition.y = Mathf.Clamp( newPosition.y, -yMax, yMax );
			moveDirection.y = -moveDirection.y;
		}
		// 4
		transform.position = newPosition;
	}
}
