using UnityEngine;
using System.Collections;

public class ZombieSpawn : MonoBehaviour {

	public float minSpawnTime = 0.75f; 
	public float maxSpawnTime = 2f; 
	public GameObject zombie;
	public float xMin, xMax, yMin, yMax; 

	//2    
	void Start () {
		Invoke("SpawnZombie",minSpawnTime);
	}
	
	//3
	void SpawnZombie()
	{
		// 2
		Vector3 pos = 
			new Vector3(Random.Range(transform.position.x + xMin, transform.position.x + xMax),
			            Random.Range(transform.position.y + yMin, transform.position.y + yMax),
			            zombie.transform.position.z);
		

		Instantiate (zombie, pos, zombie.transform.rotation);
		            //Quaternion.identity);

		Invoke("SpawnZombie", Random.Range(minSpawnTime, maxSpawnTime));
	}
	// Use this for initialization
}
