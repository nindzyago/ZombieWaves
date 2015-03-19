using UnityEngine;
using System.Collections;

public class CameraMove : MonoBehaviour {

	public int zombiesLeft=20;
	public int livesLeft=3;

	float hRotation = 0.0f;    //Horizontal angle
	float zRotation = 0.0f;    //Horizontal angle
	float vRotation = 0.0f;   //Vertical rotation angle of the camera
	float cameraMovementSpeed = 2f;
	float acceleration_tolerance = 0.5f;
	float angle_max = 45f;
	float rot_z=0f;


	// Use this for initialization
	void Start () {
		Input.gyro.enabled = true;  
	}

	// Update is called once per frame
	void Update() {

		/*Vector3 acc = Input.acceleration * cameraMovementSpeed;
		
		if (Mathf.Abs(acc.x) > acceleration_tolerance) 
		{
			rot_z -= acc.x;
			
			if (rot_z > angle_max) 
				rot_z = angle_max;
			
			if (rot_z < -1 * angle_max) 
				rot_z = -1 * angle_max;
			
			transform.rotation = Quaternion.AngleAxis(rot_z, Vector3.forward);
		}     */

		Quaternion referenceRotation = Quaternion.identity;
		Quaternion deviceRotation = DeviceRotation.Get();
		Quaternion eliminationOfXY = Quaternion.Inverse(
			Quaternion.FromToRotation(referenceRotation * Vector3.up, 
		                          deviceRotation  * Vector3.up)
			);
		Quaternion rotationZ = //eliminationOfXY * 
			//Quaternion(0.5f, 0.5f, -0.5f, 0.5f)
			deviceRotation;
				//* ConvertRotation (deviceRotation) * Quaternion.identity;
		//* new Quaternion(0, 0, 1, 0);

		float roll = rotationZ.eulerAngles.z;
		//transform.rotation = eliminationOfXY * deviceRotation;

		transform.rotation = Quaternion.Euler (0, 0, roll);


		//zRotation += Input.acceleration.y * Input.acceleration.x * cameraMovementSpeed;
		//Input.acceleration.
		//vRotation += Input.acceleration.x * cameraMovementSpeed;
		//transform.rotation = Quaternion.Euler(vRotation, hRotation, zRotation);
		//if (!((roll > 45) & (roll < 315))) {
		//}
	}	

	private static Quaternion ConvertRotation(Quaternion q)
	{
		return new Quaternion(q.x, q.y, -q.z, -q.w);
	}

	// Move object using accelerometer
	float speed = 10.0f;

	public static class DeviceRotation {
		private static bool gyroInitialized = false;
		
		public static bool HasGyroscope {
			get {
				return SystemInfo.supportsGyroscope;
			}
		}
		
		public static Quaternion Get() {
			if (!gyroInitialized) {
				InitGyro();
			}
			
			return HasGyroscope
				? ReadGyroscopeRotation()
					: Quaternion.identity;
		}
		
		private static void InitGyro() {
			if (HasGyroscope) {
				Input.gyro.enabled = true;                // enable the gyroscope
				Input.gyro.updateInterval = 0.0167f;    // set the update interval to it's highest value (60 Hz)
			}
			gyroInitialized = true;
		}
		
		private static Quaternion ReadGyroscopeRotation() {
			return 
				new Quaternion(0.5f, 0.5f, -0.5f, 0.5f) * Input.gyro.attitude * new Quaternion(0, 0, 1, 0);
				//* Quaternion.identity * Input.gyro.attitude * new Quaternion(0, 0, 1, 0);
			//return Input.gyro.attitude;
			//return new Quaternion.(0.5f, 0.5f, -0.5f, 0.5f) * Input.gyro.attitude * Quaternion.identity;
		}
	}

	bool debug = false;

	protected void OnGUI()
	{
		if (zombiesLeft > 0) {

			GUILayout.Label("<size=60><color=green>Lives: " + livesLeft + "</color></size>");
		} else {
			GUILayout.Label("<size=80><color=green>Lives: YOU LOSE !</color></size>");
		}
		if (zombiesLeft > 0) {
			GUILayout.Label("<size=60><color=green>Zombies: " + zombiesLeft + "</color></size>");
		} else
		{
			GUILayout.Label("<size=80><color=red>YOU WIN !</color></size>");
		}

			
		if (!debug)
			return;
		
		GUILayout.Label("<size=40><color=white>Orientation: " + Screen.orientation + "</color></size>");
		//GUILayout.Label("Angle: " + angle);
		//GUILayout.Label("Calibration: " + calibration);
		//GUILayout.Label("Camera base: " + cameraBase);
		GUILayout.Label("<size=40><color=white>input.gyro.attitude: " + Input.gyro.attitude + "</color></size>");
		GUILayout.Label("<size=40><color=white>transform.rotation: " + transform.rotation + "</color></size><");
	}
	
/*	void Update () {
				Vector3 dir = Vector3.zero;
		
				// we assume that device is held parallel to the ground
				// and Home button is in the right hand
		
				// remap device acceleration axis to game coordinates:
				//  1) XY plane of the device is mapped onto XZ plane
				//  2) rotated 90 degrees around Y axis
				dir.x = -Input.acceleration.y;
				dir.z = Input.acceleration.x;
		
				// clamp acceleration vector to unit sphere
				if (dir.sqrMagnitude > 1)
						dir.Normalize ();
		
				// Make it move 10 meters per second instead of 10 meters per frame...
				dir *= Time.deltaTime;
		
				// Move object
				transform.Translate (dir * speed);
		}
		*/
}

