// ArrayWizard.js
//
// Created by: Greg Bassett
// Company: A-Lab Software Limited (http://www.alabsoft.com)
//
// Date: November 2010
// Version: 1.1
//
//
// Copyright © A-Lab Software Limited 2010
//

import System.IO; 

class ArrayWizard extends EditorWindow {
 
	@MenuItem ("Window/Array Wizard")
    static function ShowWindow () {
        EditorWindow.GetWindow (ArrayWizard);
    }
	
	private var PageNo : int = 1;
	
	var ArrayTypeSGridInt : int = 0;
	var ArrayTypeStrings : String[] = ["Linear", "Area", "Volume", "Radial", "Cascade"];

	var LinearDirectionSGridInt : int = 0;
	var AreaDirectionSGridInt : int = 0;
	var RadialDirectionSGridInt : int = 1;
	var RadialDirectionStrings : String[] = ["x", "y", "z"];
	var RadialRotationSGridInt : int = 3;
	var RadialRotationStrings : String[] = ["90", "180", "270", "360", "Free:"];
	var DirectionStrings : String[] = ["x", "y", "z", "xy", "xz", "yz"];

	var LinearSpacingSGridInt : int = 0;
	var AreaSpacingSGridInt : int = 0;
	var VolumeSpacingSGridInt : int = 0;
	var SpacingStrings : String[] = ["User defined", "Flush", "Equally"];

	var LinearSpacingDirectionSGridInt : int = 0;
	var AreaSpacingDirectionSGridInt : int = 0;
	var VolumeSpacingDirectionSGridInt : int = 0;
	var SpacingDirectionStrings : String[] = ["+", "-"];

	var GroupGameObjectsSGridInt : int = 0;
	var GroupGameObjectsStrings : String[] = ["No", "Yes"];

	private var LinearImage : Texture = Resources.Load("LinearArray");
	private var AreaImage : Texture = Resources.Load("AreaArray");
	private var VolumeImage : Texture = Resources.Load("VolumeArray");
	private var RadialImage : Texture = Resources.Load("RadialArray");
	private var CascadeImage : Texture = Resources.Load("CascadeArray");

	private var LinearYImage : Texture = Resources.Load("LinearArrayY");
	private var LinearZImage : Texture = Resources.Load("LinearArrayZ");
	private var LinearXYImage : Texture = Resources.Load("LinearArrayXY");
	private var LinearXZImage : Texture = Resources.Load("LinearArrayXZ");
	private var LinearYZImage : Texture = Resources.Load("LinearArrayYZ");
	
	private var AreaYImage : Texture = Resources.Load("AreaArrayY");
	private var AreaZImage : Texture = Resources.Load("AreaArrayZ");
	private var AreaXYImage : Texture = Resources.Load("AreaArrayXY");
	private var AreaXZImage : Texture = Resources.Load("AreaArrayXZ");
	private var AreaYZImage : Texture = Resources.Load("AreaArrayYZ");

	private var RadialAxisImage : Texture = Resources.Load("RadialArrayObjectAxis");
	private var RadialXImage : Texture = Resources.Load("RadialArrayX360");
	private var RadialYImage : Texture = Resources.Load("RadialArrayY360");

	private var CascadeMasterImage : Texture = Resources.Load("CascadeMasterObjectArray");
	private var CascadeNewImage : Texture = Resources.Load("CascadeNewObjectArray");

	private var LinearSpacingString : String = "1";
	private var AreaSpacingString : String = "1";
	private var VolumeSpacingString : String = "1";
	private var CopiesString : String = "1";
	private var ColumnsString : String = "2";
	private var RowsString : String = "2";
	private var PlanesString : String = "2";
	private var FreeString : String = "45";
	
	private var selectedGameObject : GameObject;
	private var x : float;
	private var y : float;
	private var z : float;
	private var Spacing : float;
	
	private var go : GameObject;
	private var i : int;
	private var j : int;
	private var clone : GameObject;
	
	private var bNormalize : boolean = false;
	private var axis : Vector3;
	private var point : Vector3;
	private var RadialGameObject : GameObject;
	private var NormalizeGameObject : GameObject;
	private var fDegrees : float;
	private var fAngle : float;
	private var CascadeMasterGameObject : GameObject;
	private var CascadeNewGameObject : GameObject;
	private var CascadePosition : Vector3;
	private var CascadeRotation : Quaternion;
	private var CascadeScale : Vector3;

	private var ParentPosition : Vector3;
	private var ParentRotation : Quaternion;
	private var ParentScale : Vector3;
	private var bSnapToSurface : boolean = false;
	private var hit : RaycastHit; 
	private var bAddRandomNoise : boolean = false;
	private var SeedString : String = "0.1";
	
	function OnGUI() {
		if(PageNo==1){
			EditorGUILayout.Space ();
			GUILayout.BeginHorizontal ();	
			GUILayout.BeginVertical ();	
			EditorGUILayout.Space ();
			switch(ArrayTypeSGridInt)
			{
			case 0:
				GUILayout.Label(LinearImage);
				break;
			case 1:
				GUILayout.Label(AreaImage);
				break;
			case 2:
				GUILayout.Label(VolumeImage);
				break;
			case 3:
				GUILayout.Label(RadialImage);
				break;
			case 4:
				GUILayout.Label(CascadeImage);
				break;
			}
			GUILayout.EndVertical ();	
			GUILayout.BeginVertical ();	
			GUILayout.Label("Please select type of array?",EditorStyles.wordWrappedLabel);
			ArrayTypeSGridInt = GUILayout.SelectionGrid (ArrayTypeSGridInt, ArrayTypeStrings, 1,GUILayout.Width(70));
			GUILayout.EndVertical ();	
			GUILayout.EndHorizontal ();	
			
			EditorGUILayout.Space ();
			GUILayout.BeginHorizontal ();	
			GUI.enabled = false;
			if (GUILayout.Button ("Back")) {
			
			}
			GUI.enabled = true;
			if (GUILayout.Button ("Next")) {
				if(ArrayTypeSGridInt==3){
					RadialGameObject = Selection.activeGameObject;
				}
				PageNo = 2;
			}
			GUILayout.EndHorizontal ();			
		}	
		if(PageNo==2){
			if(ArrayTypeSGridInt==0){ // Linear
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				switch(LinearDirectionSGridInt)
				{
				case 0:
					GUILayout.Label(LinearImage);
					break;
				case 1:
					GUILayout.Label(LinearYImage);
					break;
				case 2:
					GUILayout.Label(LinearZImage);
					break;
				case 3:
					GUILayout.Label(LinearXYImage);
					break;
				case 4:
					GUILayout.Label(LinearXZImage);
					break;
				case 5:
					GUILayout.Label(LinearYZImage);
					break;
				}
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Select direction?",EditorStyles.wordWrappedLabel);
				GUILayout.Label("Either horizontal, vertical or diagonal...",EditorStyles.wordWrappedLabel);
				LinearDirectionSGridInt = GUILayout.SelectionGrid (LinearDirectionSGridInt, DirectionStrings, 3,GUILayout.Width(80));
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();	
			}

			if(ArrayTypeSGridInt==1){ // Area
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				switch(AreaDirectionSGridInt)
				{
				case 0:
					GUILayout.Label(AreaImage);
					break;
				case 1:
					GUILayout.Label(AreaYImage);
					break;
				case 2:
					GUILayout.Label(AreaZImage);
					break;
				case 3:
					GUILayout.Label(AreaXYImage);
					break;
				case 4:
					GUILayout.Label(AreaXZImage);
					break;
				case 5:
					GUILayout.Label(AreaYZImage);
					break;
				}
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Select direction?",EditorStyles.wordWrappedLabel);
				GUILayout.Label("Either horizontal, vertical or diagonal...",EditorStyles.wordWrappedLabel);
				AreaDirectionSGridInt = GUILayout.SelectionGrid (AreaDirectionSGridInt, DirectionStrings, 3,GUILayout.Width(80));
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();	
			}

			if(ArrayTypeSGridInt==2){ // Volume
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				GUILayout.Label(VolumeImage);
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Please select spacing between GameObjects?",EditorStyles.wordWrappedLabel);
				if(VolumeSpacingSGridInt==0){
					VolumeSpacingString = GUILayout.TextField (VolumeSpacingString,3,GUILayout.Width(27));	
				} else {
					GUI.enabled = false;
					VolumeSpacingString = GUILayout.TextField (VolumeSpacingString,3,GUILayout.Width(27));	
					GUI.enabled = true;				
				}
				VolumeSpacingSGridInt = GUILayout.SelectionGrid (VolumeSpacingSGridInt, SpacingStrings, 1,GUILayout.Width(100));
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Axis direction:",EditorStyles.wordWrappedLabel);
				VolumeSpacingDirectionSGridInt = GUILayout.SelectionGrid (VolumeSpacingDirectionSGridInt, SpacingDirectionStrings, 2,GUILayout.Width(40));
				GUILayout.EndHorizontal ();	
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();				
			}
			
			if(ArrayTypeSGridInt==3){ // Radial
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				GUILayout.Label(RadialAxisImage);
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Select center point of array?",EditorStyles.wordWrappedLabel);
				EditorGUILayout.Space ();
				GUILayout.Label("Either click on a GameObject in the scene, or check the 'Normalize Location' checkbox to use the 0, 0, 0 axis point.",EditorStyles.wordWrappedLabel);
				bNormalize = GUILayout.Toggle(bNormalize, "Normalize Location");			
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();				
			}

			if(ArrayTypeSGridInt==4){ // Cascade
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				GUILayout.Label(CascadeMasterImage);
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Select a master GameObject to cascade?",EditorStyles.wordWrappedLabel);
				EditorGUILayout.Space ();
				GUILayout.Label("Click on any GameObject in the scene.",EditorStyles.wordWrappedLabel);
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();				
			}

			EditorGUILayout.Space ();
			GUILayout.BeginHorizontal ();	
			if (GUILayout.Button ("Back")) {
				PageNo = 1;
			}
			if (GUILayout.Button ("Next")) {
				if(ArrayTypeSGridInt==3){
					NormalizeGameObject = Selection.activeGameObject;
				}
				if(ArrayTypeSGridInt==4){
					if(Selection.activeGameObject == null){
						EditorUtility.DisplayDialog("Error!", "No GameObject selected!\n\nPlease select a GameObject in the scene, and click Next to proceed.", "Ok");
						return;
					} else {
						CascadeMasterGameObject = Selection.activeGameObject;
						CascadeNewGameObject = Instantiate (CascadeMasterGameObject, CascadeMasterGameObject.transform.position, CascadeMasterGameObject.transform.rotation);
						CascadeNewGameObject.name = CascadeMasterGameObject.name;
						EditorGUIUtility.PingObject(CascadeNewGameObject);
						Selection.activeGameObject = CascadeNewGameObject.gameObject;
						PageNo = 3;
					}
				} else {
					PageNo = 3;
				}
			}
			GUILayout.EndHorizontal ();			

		}
			
		if(PageNo==3){
			if(ArrayTypeSGridInt==0){
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				switch(LinearDirectionSGridInt)
				{
				case 0:
					GUILayout.Label(LinearImage);
					break;
				case 1:
					GUILayout.Label(LinearYImage);
					break;
				case 2:
					GUILayout.Label(LinearZImage);
					break;
				case 3:
					GUILayout.Label(LinearXYImage);
					break;
				case 4:
					GUILayout.Label(LinearXZImage);
					break;
				case 5:
					GUILayout.Label(LinearYZImage);
					break;
				}
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Please select spacing between GameObjects?",EditorStyles.wordWrappedLabel);
				if(LinearSpacingSGridInt==0){
					LinearSpacingString = GUILayout.TextField (LinearSpacingString,3,GUILayout.Width(27));	
				} else {
					GUI.enabled = false;
					LinearSpacingString = GUILayout.TextField (LinearSpacingString,3,GUILayout.Width(27));	
					GUI.enabled = true;				
				}
				LinearSpacingSGridInt = GUILayout.SelectionGrid (LinearSpacingSGridInt, SpacingStrings, 1,GUILayout.Width(100));
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Axis direction:",EditorStyles.wordWrappedLabel);
				LinearSpacingDirectionSGridInt = GUILayout.SelectionGrid (LinearSpacingDirectionSGridInt, SpacingDirectionStrings, 2,GUILayout.Width(40));
				GUILayout.EndHorizontal ();	
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();	
			}

			if(ArrayTypeSGridInt==1){ // Area
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				switch(AreaDirectionSGridInt)
				{
				case 0:
					GUILayout.Label(AreaImage);
					break;
				case 1:
					GUILayout.Label(AreaYImage);
					break;
				case 2:
					GUILayout.Label(AreaZImage);
					break;
				case 3:
					GUILayout.Label(AreaXYImage);
					break;
				case 4:
					GUILayout.Label(AreaXZImage);
					break;
				case 5:
					GUILayout.Label(AreaYZImage);
					break;
				}
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Please select spacing between GameObjects?",EditorStyles.wordWrappedLabel);
				if(AreaSpacingSGridInt==0){
					AreaSpacingString = GUILayout.TextField (AreaSpacingString,3,GUILayout.Width(27));	
				} else {
					GUI.enabled = false;
					AreaSpacingString = GUILayout.TextField (AreaSpacingString,3,GUILayout.Width(27));	
					GUI.enabled = true;				
				}
				AreaSpacingSGridInt = GUILayout.SelectionGrid (AreaSpacingSGridInt, SpacingStrings, 1,GUILayout.Width(100));
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Axis direction:",EditorStyles.wordWrappedLabel);
				AreaSpacingDirectionSGridInt = GUILayout.SelectionGrid (AreaSpacingDirectionSGridInt, SpacingDirectionStrings, 2,GUILayout.Width(40));
				GUILayout.EndHorizontal ();	
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();	
			}

			if(ArrayTypeSGridInt==2){ // Volume
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				GUILayout.Label(VolumeImage);
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Enter the number of columns and rows and planes?",EditorStyles.wordWrappedLabel);
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Number of columns:",EditorStyles.wordWrappedLabel);
				ColumnsString = GUILayout.TextField (ColumnsString,3,GUILayout.Width(27));	
				GUILayout.EndHorizontal ();	
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Number of rows:",EditorStyles.wordWrappedLabel);
				RowsString = GUILayout.TextField (RowsString,3,GUILayout.Width(27));	
				GUILayout.EndHorizontal ();	
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Number of planes:",EditorStyles.wordWrappedLabel);
				PlanesString = GUILayout.TextField (PlanesString,3,GUILayout.Width(27));	
				GUILayout.EndHorizontal ();	
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();			
			}
			
			if(ArrayTypeSGridInt==3){ // Radial
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				switch(RadialDirectionSGridInt)
				{
				case 0:
					GUILayout.Label(RadialXImage);
					break;
				case 1:
					GUILayout.Label(RadialImage);
					break;
				case 2:
					GUILayout.Label(RadialYImage);
					break;
				}
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Select direction and rotation?",EditorStyles.wordWrappedLabel);
				RadialDirectionSGridInt = GUILayout.SelectionGrid (RadialDirectionSGridInt, RadialDirectionStrings, 3,GUILayout.Width(80));
				EditorGUILayout.Space ();
				RadialRotationSGridInt = GUILayout.SelectionGrid (RadialRotationSGridInt, RadialRotationStrings, 3,GUILayout.Width(120));
				GUILayout.BeginHorizontal ();	
				FreeString = GUILayout.TextField (FreeString,3,GUILayout.Width(27));	
				GUILayout.Label("degrees.",EditorStyles.wordWrappedLabel);
				GUILayout.EndHorizontal ();	
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();				
			}

			if(ArrayTypeSGridInt==4){ // Cascade
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				GUILayout.Label(CascadeNewImage);
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Move, rotate and/or scale the newly create GameObject.",EditorStyles.wordWrappedLabel);
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();							
			}
			
			EditorGUILayout.Space ();
			GUILayout.BeginHorizontal ();	
			if (GUILayout.Button ("Back")) {
				PageNo = 2;
			}
			if (GUILayout.Button ("Next")) {
				PageNo = 4;
			}
			GUILayout.EndHorizontal ();			
		}
		if(PageNo==4){
			if(ArrayTypeSGridInt==0){
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				switch(LinearDirectionSGridInt)
				{
				case 0:
					GUILayout.Label(LinearImage);
					break;
				case 1:
					GUILayout.Label(LinearYImage);
					break;
				case 2:
					GUILayout.Label(LinearZImage);
					break;
				case 3:
					GUILayout.Label(LinearXYImage);
					break;
				case 4:
					GUILayout.Label(LinearXZImage);
					break;
				case 5:
					GUILayout.Label(LinearYZImage);
					break;
				}
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("That's it! enter the number of copies you require and click Finish to create the array.",EditorStyles.wordWrappedLabel);
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Number of copies:",EditorStyles.wordWrappedLabel);
				CopiesString = GUILayout.TextField (CopiesString,3,GUILayout.Width(27));	
				GUILayout.EndHorizontal ();	
				//EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Group copies?",EditorStyles.wordWrappedLabel);
				GroupGameObjectsSGridInt = GUILayout.SelectionGrid (GroupGameObjectsSGridInt, GroupGameObjectsStrings, 2,GUILayout.Width(65));
				GUILayout.EndHorizontal ();	
				//EditorGUILayout.Space ();	
				bSnapToSurface = GUILayout.Toggle(bSnapToSurface, "Snap to surface");			
				GUILayout.BeginHorizontal ();	
				bAddRandomNoise = GUILayout.Toggle(bAddRandomNoise, "Add Random Noise");
				if(bAddRandomNoise){
					GUILayout.Label("Seed:",EditorStyles.wordWrappedLabel);
					SeedString = GUILayout.TextField (SeedString,3,GUILayout.Width(27));					
				} else {
					GUI.enabled = false;
					GUILayout.Label("Seed:",EditorStyles.wordWrappedLabel);
					SeedString = GUILayout.TextField (SeedString,3,GUILayout.Width(27));									
					GUI.enabled = true;
				}
				GUILayout.EndHorizontal ();					
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();	
				
				
				
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				if (GUILayout.Button ("Back")) {
					PageNo = 3;
				}
				if (GUILayout.Button ("Finish")) {
				
					if(Selection.activeGameObject == null){
						EditorUtility.DisplayDialog("Error!", "No GameObject selected!\n\nPlease select a GameObject in the scene, and click Finish to create the array.", "Ok");
						return;
					} else {
						if(GroupGameObjectsSGridInt==1){
							go = new GameObject("GameObject");
							go.transform.position = Selection.activeGameObject.transform.position;
							go.transform.rotation = Selection.activeGameObject.transform.rotation;
							Selection.activeGameObject.transform.parent = go.transform;
						}
						for (i=1;i<parseFloat(CopiesString)+1;i++) {
							if(LinearSpacingSGridInt==0){
								Spacing = parseFloat(LinearSpacingString);
							}
							if(LinearSpacingSGridInt==1){
								Spacing = Selection.activeGameObject.transform.localScale.x;
							}
							if(LinearSpacingSGridInt==2){
								Spacing = Selection.activeGameObject.transform.localScale.x * 2;
							}
							
							if(LinearDirectionSGridInt==0){ // x
								if(LinearSpacingDirectionSGridInt==0){
									x = i * Spacing + Selection.activeGameObject.transform.position.x;
								} else {
									x = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.x;							
								}
								y = Selection.activeGameObject.transform.position.y;
								z = Selection.activeGameObject.transform.position.z;
							}
							if(LinearDirectionSGridInt==1){ // y
								x = Selection.activeGameObject.transform.position.x;
								if(LinearSpacingDirectionSGridInt==0){
									y = i * Spacing + Selection.activeGameObject.transform.position.y;
								} else {
									y = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.y;							
								}
								z = Selection.activeGameObject.transform.position.z;
							}
							if(LinearDirectionSGridInt==2){ // z
								x = Selection.activeGameObject.transform.position.x;
								y = Selection.activeGameObject.transform.position.y;
								if(LinearSpacingDirectionSGridInt==0){
									z = i * Spacing + Selection.activeGameObject.transform.position.z;
								} else {
									z = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.z;
								}
							}
							if(LinearDirectionSGridInt==3){ // xy
								if(LinearSpacingDirectionSGridInt==0){
									x = i * Spacing + Selection.activeGameObject.transform.position.x;
								} else {
									x = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.x;
								}
								if(LinearSpacingDirectionSGridInt==0){
									y = i * Spacing + Selection.activeGameObject.transform.position.y;
								} else {
									y = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.y;							
								}
								z = Selection.activeGameObject.transform.position.z;
							}
							if(LinearDirectionSGridInt==4){ // xz
								if(LinearSpacingDirectionSGridInt==0){
									x = i * Spacing + Selection.activeGameObject.transform.position.x;
								} else {
									x = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.x;
								}
								y = Selection.activeGameObject.transform.position.y;
								if(LinearSpacingDirectionSGridInt==0){
									z = i * Spacing + Selection.activeGameObject.transform.position.z;
								} else {
									z = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.z;
								}
							}
							if(LinearDirectionSGridInt==5){ // yz
								x = Selection.activeGameObject.transform.position.x;
								if(LinearSpacingDirectionSGridInt==0){
									y = i * Spacing + Selection.activeGameObject.transform.position.y;
								} else {
									y = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.y;							
								}
								if(LinearSpacingDirectionSGridInt==0){
									z = i * Spacing + Selection.activeGameObject.transform.position.z;
								} else {
									z = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.z;
								}
							}
							if(bAddRandomNoise){
								// Add Noise
								x = x + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
								y = y + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
								z = z + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));							
							}
							
							clone = Instantiate (Selection.activeGameObject, Vector3(x, y, z), Selection.activeGameObject.transform.rotation);
							clone.name = Selection.activeGameObject.name + i;
							if(bSnapToSurface){
								if(Physics.Raycast (clone.transform.position, Vector3.down, hit)){ 
									clone.transform.position = hit.point; 
									clone.transform.position.y = clone.transform.position.y + (clone.transform.localScale.y / 2);
								} 
							}
							if(GroupGameObjectsSGridInt==1){
								clone.transform.parent = go.transform;
							}
						}
						if(bSnapToSurface){
						    sel = Selection.activeGameObject; 
							if(Physics.Raycast (sel.transform.position, Vector3.down, hit)){ 
								sel.transform.position = hit.point; 
								sel.transform.position.y = sel.transform.position.y + (sel.transform.localScale.y / 2);
							} 
						}
					}

					GUILayout.BeginHorizontal ();	
					
				}
			}
			if(ArrayTypeSGridInt==1){ // Area
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				switch(AreaDirectionSGridInt)
				{
				case 0:
					GUILayout.Label(AreaImage);
					break;
				case 1:
					GUILayout.Label(AreaYImage);
					break;
				case 2:
					GUILayout.Label(AreaZImage);
					break;
				case 3:
					GUILayout.Label(AreaXYImage);
					break;
				case 4:
					GUILayout.Label(AreaXZImage);
					break;
				case 5:
					GUILayout.Label(AreaYZImage);
					break;
				}
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("Enter the number of columns and rows?",EditorStyles.wordWrappedLabel);
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Number of columns:",EditorStyles.wordWrappedLabel);
				ColumnsString = GUILayout.TextField (ColumnsString,3,GUILayout.Width(27));	
				GUILayout.EndHorizontal ();	
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Number of rows:",EditorStyles.wordWrappedLabel);
				RowsString = GUILayout.TextField (RowsString,3,GUILayout.Width(27));	
				GUILayout.EndHorizontal ();	
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();
				
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				if (GUILayout.Button ("Back")) {
					PageNo = 3;
				}
				if (GUILayout.Button ("Next")) {
					PageNo = 5;
				}
				GUILayout.EndHorizontal ();			
			}
			
			if(ArrayTypeSGridInt==2){ // Volume
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				GUILayout.Label(VolumeImage);
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("That's it! click Finish to create the array.",EditorStyles.wordWrappedLabel);
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Group copies?",EditorStyles.wordWrappedLabel);
				GroupGameObjectsSGridInt = GUILayout.SelectionGrid (GroupGameObjectsSGridInt, GroupGameObjectsStrings, 2,GUILayout.Width(65));
				GUILayout.EndHorizontal ();
				bSnapToSurface = GUILayout.Toggle(bSnapToSurface, "Snap to surface");							
				GUILayout.BeginHorizontal ();	
				bAddRandomNoise = GUILayout.Toggle(bAddRandomNoise, "Add Random Noise");
				if(bAddRandomNoise){
					GUILayout.Label("Seed:",EditorStyles.wordWrappedLabel);
					SeedString = GUILayout.TextField (SeedString,3,GUILayout.Width(27));					
				} else {
					GUI.enabled = false;
					GUILayout.Label("Seed:",EditorStyles.wordWrappedLabel);
					SeedString = GUILayout.TextField (SeedString,3,GUILayout.Width(27));									
					GUI.enabled = true;
				}
				GUILayout.EndHorizontal ();					
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();	
				

				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				if (GUILayout.Button ("Back")) {
					PageNo = 3;
				}
				if (GUILayout.Button ("Finish")) {
					if(Selection.activeGameObject == null){
						EditorUtility.DisplayDialog("Error!", "No GameObject selected!\n\nPlease select a GameObject in the scene, and click Finish to create the array.", "Ok");
						return;
					} else {
						if(GroupGameObjectsSGridInt==1){
							go = new GameObject("GameObject");
							go.transform.position = Selection.activeGameObject.transform.position;
							go.transform.rotation = Selection.activeGameObject.transform.rotation;
							Selection.activeGameObject.transform.parent = go.transform;
						}
						for (k=0;k<parseFloat(PlanesString);k++) {
							for (j=0;j<parseFloat(RowsString);j++) {
								for (i=0;i<parseFloat(ColumnsString);i++) {
							
									if(VolumeSpacingSGridInt==0){
										Spacing = parseFloat(VolumeSpacingString);
									}
									if(VolumeSpacingSGridInt==1){
										Spacing = Selection.activeGameObject.transform.localScale.x;
									}
									if(VolumeSpacingSGridInt==2){
										Spacing = Selection.activeGameObject.transform.localScale.x * 2;
									}
									
									if(VolumeSpacingDirectionSGridInt==0){
										x = j * Spacing + Selection.activeGameObject.transform.position.x;
									} else {
										x = ((j * Spacing) * -1) + Selection.activeGameObject.transform.position.x;							
									}
									if(VolumeSpacingDirectionSGridInt==0){
										y = k * Spacing + Selection.activeGameObject.transform.position.y;
									} else {
										y = ((k * Spacing) * -1) + Selection.activeGameObject.transform.position.y;							
									}
									if(VolumeSpacingDirectionSGridInt==0){
										z = i * Spacing + Selection.activeGameObject.transform.position.z;
									} else {
										z = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.z;							
									}
									
									if(bAddRandomNoise){
										// Add Noise
										x = x + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
										y = y + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
										z = z + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
									}

									if((k!=0) || (j!=0) || (i!=0)){
										clone = Instantiate (Selection.activeGameObject, Vector3(x, y, z), Selection.activeGameObject.transform.rotation);
										clone.name = Selection.activeGameObject.name;
										
										if(bSnapToSurface){
											clone.transform.position.y = 100;
											if(Physics.Raycast (clone.transform.position, Vector3.down, hit)){ 
												clone.transform.position = hit.point; 
												clone.transform.position.y = clone.transform.position.y + (clone.transform.localScale.y / 2);
												if(k>0){
													if(VolumeSpacingSGridInt==0){
														clone.transform.position.y = clone.transform.position.y + Spacing;												
													}
													if(VolumeSpacingSGridInt==2){
														clone.transform.position.y = clone.transform.position.y + (Spacing / 2);												
													}
												}
											} 
										}
										
										if(GroupGameObjectsSGridInt==1){
											clone.transform.parent = go.transform;
										}
									}
									
									
									if(bSnapToSurface){
										sel = Selection.activeGameObject; 
										if(Physics.Raycast (sel.transform.position, Vector3.down, hit)){ 
											sel.transform.position = hit.point; 
											sel.transform.position.y = sel.transform.position.y + (sel.transform.localScale.y / 2);
										} 
									}
									
									
								}
							}
						}					
					}			
				}
			}
			if(ArrayTypeSGridInt==3){ // Radial
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				switch(RadialDirectionSGridInt)
				{
				case 0:
					GUILayout.Label(RadialXImage);
					break;
				case 1:
					GUILayout.Label(RadialImage);
					break;
				case 2:
					GUILayout.Label(RadialYImage);
					break;
				}
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("That's it! enter the number of copies you require and click Finish to create the array.",EditorStyles.wordWrappedLabel);
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Number of copies:",EditorStyles.wordWrappedLabel);
				CopiesString = GUILayout.TextField (CopiesString,3,GUILayout.Width(27));	
				GUILayout.EndHorizontal ();	
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Group copies?",EditorStyles.wordWrappedLabel);
				GroupGameObjectsSGridInt = GUILayout.SelectionGrid (GroupGameObjectsSGridInt, GroupGameObjectsStrings, 2,GUILayout.Width(65));
				GUILayout.EndHorizontal ();	
				bSnapToSurface = GUILayout.Toggle(bSnapToSurface, "Snap to surface");			
				GUILayout.BeginHorizontal ();	
				bAddRandomNoise = GUILayout.Toggle(bAddRandomNoise, "Add Random Noise");
				if(bAddRandomNoise){
					GUILayout.Label("Seed:",EditorStyles.wordWrappedLabel);
					SeedString = GUILayout.TextField (SeedString,3,GUILayout.Width(27));					
				} else {
					GUI.enabled = false;
					GUILayout.Label("Seed:",EditorStyles.wordWrappedLabel);
					SeedString = GUILayout.TextField (SeedString,3,GUILayout.Width(27));									
					GUI.enabled = true;
				}
				GUILayout.EndHorizontal ();					
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();		

				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				if (GUILayout.Button ("Back")) {
					PageNo = 3;
				}
				if (GUILayout.Button ("Finish")) {
					if(Selection.activeGameObject == null){
						EditorUtility.DisplayDialog("Error!", "No GameObject selected!\n\nPlease select a GameObject in the scene, and click Finish to create the array.", "Ok");
						return;
					} else {
						if(NormalizeGameObject != Selection.activeGameObject){
							RadialGameObject = Selection.activeGameObject;
						}
						if(GroupGameObjectsSGridInt==1){
							go = new GameObject("GameObject");
							go.transform.position = RadialGameObject.transform.position;
							go.transform.rotation = RadialGameObject.transform.rotation;
							RadialGameObject.transform.parent = go.transform;
						}
						if(RadialRotationSGridInt==0){
							fAngle = 90;
						}
						if(RadialRotationSGridInt==1){
							fAngle = 180;
						}
						if(RadialRotationSGridInt==2){
							fAngle = 270;
						}
						if(RadialRotationSGridInt==3){
							fAngle = 360;
						}
						if(RadialRotationSGridInt==5){
							fAngle = parseFloat(FreeString);
						}
						
						fDegrees = fAngle / parseFloat(CopiesString);
						
						for (i=1;i<parseFloat(CopiesString)+1;i++) {
							x = RadialGameObject.transform.position.x;
							y = RadialGameObject.transform.position.y;
							z = RadialGameObject.transform.position.z;
							
							if(bAddRandomNoise){
								// Add Noise
								x = x + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
								y = y + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
								z = z + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
							}
							
							clone = Instantiate (RadialGameObject, Vector3(x, y, z), RadialGameObject.transform.rotation);
							clone.name = RadialGameObject.name;
							if(RadialDirectionSGridInt==0){
								axis = Vector3(-1, 0, 0);
							}
							if(RadialDirectionSGridInt==1){
								axis = Vector3(0, 1, 0);
							}
							if(RadialDirectionSGridInt==2){
								axis = Vector3(0, 0, -1);
							}
							if(bNormalize==true){
								point = Vector3.zero;
							} else {
								point = NormalizeGameObject.transform.position;
							}
							
							clone.transform.RotateAround (point, axis, fDegrees * i);
							
							if(bSnapToSurface){
								if(Physics.Raycast (clone.transform.position, Vector3.down, hit)){ 
									clone.transform.position = hit.point; 
									clone.transform.position.y = clone.transform.position.y + (clone.transform.localScale.y / 2);
								} 
							}

							
							if(GroupGameObjectsSGridInt==1){
								clone.transform.parent = go.transform;
							}
							
						}
						
						if(bSnapToSurface){
						    sel = Selection.activeGameObject; 
							if(Physics.Raycast (sel.transform.position, Vector3.down, hit)){ 
								sel.transform.position = hit.point; 
								sel.transform.position.y = sel.transform.position.y + (sel.transform.localScale.y / 2);
							} 
						}

					}
				}
			}

			if(ArrayTypeSGridInt==4){ // Cascade
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				GUILayout.Label(CascadeImage);
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("That's it! enter the number of copies you require and click Finish to create the array.",EditorStyles.wordWrappedLabel);
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Number of copies:",EditorStyles.wordWrappedLabel);
				CopiesString = GUILayout.TextField (CopiesString,3,GUILayout.Width(27));	
				GUILayout.EndHorizontal ();	
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Group copies?",EditorStyles.wordWrappedLabel);
				GroupGameObjectsSGridInt = GUILayout.SelectionGrid (GroupGameObjectsSGridInt, GroupGameObjectsStrings, 2,GUILayout.Width(65));
				GUILayout.EndHorizontal ();	
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();		
				
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				if (GUILayout.Button ("Back")) {
					PageNo = 3;
				}
				if (GUILayout.Button ("Finish")) {
				
					if(Selection.activeGameObject == null){
						EditorUtility.DisplayDialog("Error!", "No GameObject selected!\n\nPlease select a GameObject in the scene, and click Finish to create the array.", "Ok");
						return;
					} else {
						if(GroupGameObjectsSGridInt==1){
							go = new GameObject("GameObject");
							go.transform.position = CascadeMasterGameObject.transform.position;
							go.transform.rotation = CascadeMasterGameObject.transform.rotation;
							CascadeMasterGameObject.transform.parent = go.transform;
							CascadeNewGameObject.transform.parent = go.transform;
						}

						ParentPosition = CascadeMasterGameObject.transform.position;
						ParentRotation = CascadeMasterGameObject.transform.rotation;
						ParentScale = CascadeMasterGameObject.transform.localScale;

						for (i=1;i<parseFloat(CopiesString)+1;i++) {
						
							if(i==1){
								CascadePosition.x = (CascadeNewGameObject.transform.position.x + CascadeNewGameObject.transform.position.x) - ParentPosition.x;
								CascadePosition.y = (CascadeNewGameObject.transform.position.y + CascadeNewGameObject.transform.position.y) - ParentPosition.y;
								CascadePosition.z = (CascadeNewGameObject.transform.position.z + CascadeNewGameObject.transform.position.z) - ParentPosition.z;
							} else {
								CascadePosition.x = (clone.transform.position.x + clone.transform.position.x) - ParentPosition.x;
								CascadePosition.y = (clone.transform.position.y + clone.transform.position.y) - ParentPosition.y;
								CascadePosition.z = (clone.transform.position.z + clone.transform.position.z) - ParentPosition.z;							
							}
							
							if(i==1){
								CascadeRotation = (CascadeNewGameObject.transform.rotation * CascadeNewGameObject.transform.rotation);
							} else {
								CascadeRotation = CascadeRotation * (CascadeMasterGameObject.transform.rotation * CascadeNewGameObject.transform.rotation);
							}
							if(i==1){
								CascadeScale = CascadeNewGameObject.transform.localScale + CascadeNewGameObject.transform.localScale;							
							} else {
								CascadeScale = CascadeScale + CascadeNewGameObject.transform.localScale;
							}
							
							if(i==1){
								ParentPosition = CascadeNewGameObject.transform.position;
								ParentRotation = CascadeNewGameObject.transform.rotation;
								ParentScale = CascadeNewGameObject.transform.localScale;
							} else {
								ParentPosition = clone.transform.position;
								ParentRotation = clone.transform.rotation;
								ParentScale = clone.transform.localScale;
							}

							clone = Instantiate (CascadeNewGameObject, CascadePosition, CascadeRotation);
							clone.transform.localScale = CascadeScale;
							clone.name = CascadeMasterGameObject.name;
							
							if(GroupGameObjectsSGridInt==1){
								clone.transform.parent = go.transform;
							}
						}
					}
				}
			}
				
		}
		
		if(PageNo==5){
			if(ArrayTypeSGridInt==1){
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.BeginVertical ();	
				EditorGUILayout.Space ();
				switch(AreaDirectionSGridInt)
				{
				case 0:
					GUILayout.Label(AreaImage);
					break;
				case 1:
					GUILayout.Label(AreaYImage);
					break;
				case 2:
					GUILayout.Label(AreaZImage);
					break;
				case 3:
					GUILayout.Label(AreaXYImage);
					break;
				case 4:
					GUILayout.Label(AreaXZImage);
					break;
				case 5:
					GUILayout.Label(AreaYZImage);
					break;
				}
				GUILayout.EndVertical ();	
				GUILayout.BeginVertical ();	
				GUILayout.Label("That's it! click Finish to create the array.",EditorStyles.wordWrappedLabel);
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				EditorGUILayout.Space ();
				GUILayout.BeginHorizontal ();	
				GUILayout.Label("Group copies?",EditorStyles.wordWrappedLabel);
				GroupGameObjectsSGridInt = GUILayout.SelectionGrid (GroupGameObjectsSGridInt, GroupGameObjectsStrings, 2,GUILayout.Width(65));
				GUILayout.EndHorizontal ();	
				bSnapToSurface = GUILayout.Toggle(bSnapToSurface, "Snap to surface");			
				GUILayout.BeginHorizontal ();	
				bAddRandomNoise = GUILayout.Toggle(bAddRandomNoise, "Add Random Noise");
				if(bAddRandomNoise){
					GUILayout.Label("Seed:",EditorStyles.wordWrappedLabel);
					SeedString = GUILayout.TextField (SeedString,3,GUILayout.Width(27));					
				} else {
					GUI.enabled = false;
					GUILayout.Label("Seed:",EditorStyles.wordWrappedLabel);
					SeedString = GUILayout.TextField (SeedString,3,GUILayout.Width(27));									
					GUI.enabled = true;
				}
				GUILayout.EndHorizontal ();					
				GUILayout.EndVertical ();	
				GUILayout.EndHorizontal ();	
				
			}

			EditorGUILayout.Space ();
			GUILayout.BeginHorizontal ();	
			if (GUILayout.Button ("Back")) {
				PageNo = 4;
			}
			if (GUILayout.Button ("Finish")) {
				if(Selection.activeGameObject == null){
					EditorUtility.DisplayDialog("Error!", "No GameObject selected!\n\nPlease select a GameObject in the scene, and click Finish to create the array.", "Ok");
					return;
				} else {
					if(GroupGameObjectsSGridInt==1){
						go = new GameObject("GameObject");
						go.transform.position = Selection.activeGameObject.transform.position;
						go.transform.rotation = Selection.activeGameObject.transform.rotation;
						Selection.activeGameObject.transform.parent = go.transform;
					}
					for (j=0;j<parseFloat(RowsString);j++) {
						for (i=0;i<parseFloat(ColumnsString);i++) {
						
							if(AreaSpacingSGridInt==0){
								Spacing = parseFloat(AreaSpacingString);
							}
							if(AreaSpacingSGridInt==1){
								Spacing = Selection.activeGameObject.transform.localScale.x;
							}
							if(AreaSpacingSGridInt==2){
								Spacing = Selection.activeGameObject.transform.localScale.x * 2;
							}

							if(AreaDirectionSGridInt==0){ // x
								if(AreaSpacingDirectionSGridInt==0){
									x = i * Spacing + Selection.activeGameObject.transform.position.x;
								} else {
									x = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.x;							
								}
								y = Selection.activeGameObject.transform.position.y;
								if(AreaSpacingDirectionSGridInt==0){
									z = j * Spacing + Selection.activeGameObject.transform.position.z;
								} else {
									z = ((j * Spacing) * -1) + Selection.activeGameObject.transform.position.z;							
								}
							}		
							
							if(AreaDirectionSGridInt==1){ // y
								if(AreaSpacingDirectionSGridInt==0){
									x = i * Spacing + Selection.activeGameObject.transform.position.x;
								} else {
									x = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.x;							
								}
								if(AreaSpacingDirectionSGridInt==0){
									y = j * Spacing + Selection.activeGameObject.transform.position.y;
								} else {
									y = ((j * Spacing) * -1) + Selection.activeGameObject.transform.position.y;							
								}
								z = Selection.activeGameObject.transform.position.z;
							}		

							if(AreaDirectionSGridInt==2){ // z
								x = Selection.activeGameObject.transform.position.x;
								if(AreaSpacingDirectionSGridInt==0){
									y = j * Spacing + Selection.activeGameObject.transform.position.y;
								} else {
									y = ((j * Spacing) * -1) + Selection.activeGameObject.transform.position.y;							
								}
								if(AreaSpacingDirectionSGridInt==0){
									z = i * Spacing + Selection.activeGameObject.transform.position.z;
								} else {
									z = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.z;							
								}
							}		

							if(AreaDirectionSGridInt==3){ // xy
								if(AreaSpacingDirectionSGridInt==0){
									x = j * Spacing + Selection.activeGameObject.transform.position.x;
								} else {
									x = ((j * Spacing) * -1) + Selection.activeGameObject.transform.position.x;							
								}
								if(AreaSpacingDirectionSGridInt==0){
									y = j * Spacing + Selection.activeGameObject.transform.position.y;
								} else {
									y = ((j * Spacing) * -1) + Selection.activeGameObject.transform.position.y;							
								}
								if(AreaSpacingDirectionSGridInt==0){
									z = i * Spacing + Selection.activeGameObject.transform.position.z;
								} else {
									z = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.z;							
								}
							}		

							if(AreaDirectionSGridInt==4){ // xz
								if(AreaSpacingDirectionSGridInt==0){
									x = j * Spacing + Selection.activeGameObject.transform.position.x;
								} else {
									x = ((j * Spacing) * -1) + Selection.activeGameObject.transform.position.x;							
								}
								if(AreaSpacingDirectionSGridInt==0){
									y = i * Spacing + Selection.activeGameObject.transform.position.y;
								} else {
									y = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.y;							
								}
								if(AreaSpacingDirectionSGridInt==0){
									z = j * Spacing + Selection.activeGameObject.transform.position.z;
								} else {
									z = ((j * Spacing) * -1) + Selection.activeGameObject.transform.position.z;							
								}
							}		

							if(AreaDirectionSGridInt==5){ // yz
								if(AreaSpacingDirectionSGridInt==0){
									x = j * Spacing + Selection.activeGameObject.transform.position.x;
								} else {
									x = ((j * Spacing) * -1) + Selection.activeGameObject.transform.position.x;							
								}
								if(AreaSpacingDirectionSGridInt==0){
									y = i * Spacing + Selection.activeGameObject.transform.position.y;
								} else {
									y = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.y;							
								}
								if(AreaSpacingDirectionSGridInt==0){
									z = i * Spacing + Selection.activeGameObject.transform.position.z;
								} else {
									z = ((i * Spacing) * -1) + Selection.activeGameObject.transform.position.z;							
								}
							}		

							if(bAddRandomNoise){
								// Add Noise
								x = x + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
								y = y + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));
								z = z + Random.Range(parseFloat(SeedString) * -1, parseFloat(SeedString));							
							}


							if((j!=0) || (i!=0)){
								clone = Instantiate (Selection.activeGameObject, Vector3(x, y, z), Selection.activeGameObject.transform.rotation);
								clone.name = Selection.activeGameObject.name;
								
								if(bSnapToSurface){
									clone.transform.position.y = 100;
									if(Physics.Raycast (clone.transform.position, Vector3.down, hit)){ 
										clone.transform.position = hit.point; 
										clone.transform.position.y = clone.transform.position.y + (clone.transform.localScale.y / 2);
									} 
								}
								
								
								if(GroupGameObjectsSGridInt==1){
									clone.transform.parent = go.transform;
								}								
							}

							if(bSnapToSurface){
								sel = Selection.activeGameObject; 
								if(Physics.Raycast (sel.transform.position, Vector3.down, hit)){ 
									sel.transform.position = hit.point; 
									sel.transform.position.y = sel.transform.position.y + (sel.transform.localScale.y / 2);
								} 
							}


						}
					}					
				}
			}
			GUILayout.EndHorizontal ();			
		}
	}
}