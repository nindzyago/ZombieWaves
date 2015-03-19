using UnityEngine;
using System.Collections;

public class SwipeControl : MonoBehaviour {

		public Transform player; // Drag your player here
		private Vector2 fp; // first finger position
		private Vector2 lp; // last finger position
		float angleAcceleration = 0.01f;
		public GameObject bullet;

		void Update () {
			foreach(Touch touch in Input.touches)
			{
				if (touch.phase == TouchPhase.Began)
				{
					fp = touch.position;
					lp = touch.position;
				}
				if (touch.phase == TouchPhase.Moved )
				{
					lp = touch.position;
					float angle = -1 * (lp.x - fp.x) * angleAcceleration + transform.rotation.eulerAngles.z;
					transform.rotation = Quaternion.Euler (0, 0, angle);
					//transform.position = lp - fp;
				}
				if(touch.phase == TouchPhase.Ended)
				{
				Vector3 pos = GameObject.Find ("FirePoint").transform.position;
				Quaternion rotation = GameObject.Find ("FirePoint").transform.rotation;
				Instantiate(bullet, pos, rotation) ;

					if((fp.x - lp.x) > 80) // left swipe
					{
						player.Rotate(0,-90,0);
					}
					else if((fp.x - lp.x) < -80) // right swipe
					{
						player.Rotate(0,90,0);
					}
					else if((fp.y - lp.y) < -80 ) // up swipe
					{
						// add your jumping code here
					}
				}
			}
		}
	}
