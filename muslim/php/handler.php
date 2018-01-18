<?php
	include('connection.php');
	
	if(isset($_POST['forum'])){
		$name = $_POST["name"];
		$message = $_POST["message"];
		$img = $_POST["imgFB"];
		$topic = $_POST['topic'];
		$query = "INSERT INTO tblforum (name,img,message,topic) VALUES('$name','$img','$message','$topic')";
	
		if(mysqli_query($con,$query)){
			echo "true";
		}
		else{
			echo mysqli_error($con);
		}
	}

	else if(isset($_POST['getForum'])){
		$topic = $_POST['topic'];
		$screen = $_POST['screen'];
		$query = "SELECT * FROM tblforum WHERE topic = '$topic' ORDER BY forum_id DESC";
		$result = mysqli_query($con,$query);
		$arrayRow = array();
		$array = array();
		
		while($row = mysqli_fetch_array($result)){
			$arrayRow = array();
			for($i=0 ; $i<=5; $i++){
				array_push($arrayRow,$row[$i]);
			}
			array_push($array, $arrayRow);
		}
		
		 forumTemplate(json_encode(array("json"=>$array)),$screen);
	}
	
	else if(isset($_POST['videoComment'])){
	
		$comment = $_POST['comment'];
		$video = $_POST['video'];
		$name = $_POST['name'];
		$imgFB = $_POST['imgFB'];
		
		$query = "INSERT INTO tblvideocomment (video_name,user_name,user_img, user_comment) VALUES('$video','$name','$imgFB','$comment')";
		
		if(mysqli_query($con,$query)){
			echo "true";
		}
		else{
			echo mysqli_error($con);
		}
	}

	else if(isset($_POST['getAllCommentVideo'])){
		$screen = $_POST['screen'];
		$video = $_POST['video'];
		$query = "SELECT * FROM tblvideocomment WHERE video_name = '$video' ORDER BY comment_id DESC";
		$result = mysqli_query($con,$query);
		$arrayRow = array();
		$array = array();
		
		while($row = mysqli_fetch_array($result)){
			$arrayRow = array();
			for($i=0 ; $i<=6; $i++){
				array_push($arrayRow,$row[$i]);
			}
			array_push($array, $arrayRow);
		}
	
		commentVideoTemplate(json_encode(array("json"=>$array)), $screen);
	}

	else if(isset($_POST['like'])){
		$id = $_POST['id'];
		
		$query = 'UPDATE tblvideocomment SET likes = likes+1 WHERE comment_id = '.$id.'';
		
		if(mysqli_query($con,$query)){
			echo "true";
		}
		else{
			echo mysqli_error($con);
		}
	}

	else if(isset($_POST['addLikeVideo'])){
		$video = $_POST['video'];
		$name = $_POST['name'];
		
		$query = 'UPDATE tblvideolikes tblvideo SET likes = likes+1 WHERE video_name ="'.$video.'" ';

		if(mysqli_query($con,$query)){
			
			$query = 'INSERT INTO tblvideo (video_name, user_name, like_check) VALUES("'.$video.'","'.$name.'", 1)';
			if(mysqli_query($con,$query)){
				echo "true";
			}
			else{
				echo mysqli_error($con);
			}
		}
		else{
			echo mysqli_error($con);
		}
	}

	else if(isset($_POST['getVideoLikes'])){
		$name = $_POST['name'];
		$video = $_POST['video'];
		$array = array();
		
		$query = "SELECT likes FROM tblvideolikes WHERE video_name = '$video'";
		$result = mysqli_query($con,$query);
		$row = mysqli_fetch_array($result);
		array_push($array, $row[0]);
		
		$query = "SELECT like_check FROM tblvideo 
				WHERE user_name = '".$name."' and video_name = '".$video."'";
		$result = mysqli_query($con,$query);
		$row = mysqli_fetch_array($result);
		array_push($array, $row[0]);
		
		
		echo json_encode(array('json'=>$array));
	}

	else if(isset($_POST['replyComment'])){
		$img = $_POST['imgFB'];
		$reply = $_POST['reply'];
		$name = $_POST['name'];
		$id = $_POST['id'];
		
		$query = 'INSERT INTO tblreplycomment(comment_id, user_name, user_img, user_reply) VALUES('.$id.',"'.$name.'", "'.$img.'", 					"'.$reply.'")';
		if(mysqli_query($con, $query)){
			$query = 'UPDATE tblvideocomment SET number_comments = number_comments + 1 WHERE comment_id ='.$id.' ';
			
			if(mysqli_query($con, $query)){
				echo "true";
			}
		}
		else{
			echo mysqli_error($con);
		}
	}

	else if(isset($_POST['getAllReplies'])){
		$id = $_POST['id'];
		$screen = $_POST['screen'];
			
		$query = 'SELECT r.user_name, r.user_img, r.user_reply 
					FROM tblreplycomment r JOIN tblvideocomment v
					ON r.comment_id = '.$id.' and v.comment_id = '.$id.' ORDER BY r.comment_id DESC ';
		$result = mysqli_query($con,$query);
		$arrayRow = array();
		$array = array();

		while($row = mysqli_fetch_array($result)){
			$arrayRow = array();
			for($i=0 ; $i<3; $i++){
				array_push($arrayRow,$row[$i]);
			}
			array_push($array, $arrayRow);
		}
		
		replyCommentTemplate(json_encode(array("json"=>$array)), $screen);
	}

	else if(isset($_POST['replyForum'])){
		$id = $_POST['id'];
		$name = $_POST['name'];
		$img = $_POST['imgFB'];
		$reply = $_POST['reply'];
		
		$query = 'INSERT INTO tblreplyforum(forum_id, user_name, user_img, user_reply) 										VALUES('.$id.',"'.$name.'","'.$img.'","'.$reply.'")';
		
		if(mysqli_query($con, $query)){
			
			$query = 'UPDATE tblforum SET number_comments = number_comments + 1 WHERE forum_id = '.$id.'';
			if(mysqli_query($con, $query)){
				echo "true";
			}
		}
		else{
			echo mysqli_error($con);
		}
	}

	else if(isset($_POST['getAllRepliesForum'])){
		$id = $_POST['id'];
		$screen = $_POST['screen'];
		
		$query = 'SELECT r.user_name, r.user_img, r.user_reply FROM tblreplyforum r JOIN tblforum f ON r.forum_id = '.$id.' AND f.forum_id = '.$id.' ORDER BY r.forum_id DESC';
		$result = mysqli_query($con,$query);
		$arrayRow = array();
		$array = array();
		
		while($row = mysqli_fetch_array($result)){
			$arrayRow = array();
			for($i=0 ; $i<3; $i++){
				array_push($arrayRow,$row[$i]);
			}
			array_push($array, $arrayRow);
		}
		
		replyForumTemplate(json_encode(array("json"=>$array)), $screen);
	}


	function commentVideoTemplate($jsonArray, $screen){
		$json = json_decode($jsonArray);
		
		if($screen == "desktop"){
			
			for($c1 = 0; $c1< count($json->json); $c1++){
				?>
				<div class="row">
					<div class="col s12 m12">
						<div class="card-panel grey lighten-4">
							<div class="row valign-wrapper">
								<div class="col s12 m2 img-forum">
									<img id="imgForum" src="<?php echo $json->json[$c1][3]?>" alt="" class="circle responsive-img">
								</div>
								<div class="col s12 m10">
										<h5><blockquote><?php echo $json->json[$c1][2]?></blockquote></h5>
																		<span>
										<?php echo $json->json[$c1][4]?>
																		</span>
																		<div>
										<div class="container">
										<a id="<?php echo $json->json[$c1][0]?>" onclick="wew('<?php echo $json->json[$c1][0]?>','<?php echo $json->json[$c1][5]?>')" class=""><span class="right grey-text text-darken-1 likes"><?php echo $json->json[$c1][5]?></span><i class="material-icons prefix right collapsible-header grey-text text-darken-2">thumb_up</i></a>
										<a onclick="modalComment('<?php echo $json->json[$c1][0]?>','<?php echo $json->json[$c1][2]?>','<?php echo $json->json[$c1][3]?>','<?php echo $json->json[$c1][4]?>')" href="#modalComment" class="modal-trigger"><span class="number-comments<?php echo $json->json[$c1][0]?> right grey-text text-darken-1"><?php echo $json->json[$c1][6]?></span><i class="material-icons prefix right collapsible-header grey-text text-darken-2">comment</i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			<?php
			}
		}
		
		else{
			for($c1 = 0; $c1< count($json->json); $c1++){
				?>
				<div class="row">
					<div class="col s12 m12">
						<div class="card-panel grey lighten-4">
							<div class="row">
								<div class="col s12 center-align">
									<img  src="<?php echo $json->json[$c1][3]?>" alt="" class="circle responsive-img"> 
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<h5><blockquote><?php echo $json->json[$c1][2]?></blockquote></h5>
									<span>
										<?php echo $json->json[$c1][4]?>
									</span>
									<div>
										<div class="container">
											<a id="<?php echo $json->json[$c1][0]?>" onclick="wew('<?php echo $json->json[$c1][0]?>','<?php echo $json->json[$c1][5]?>')" class=""><span class="right grey-text text-darken-1 likes"><?php echo $json->json[$c1][5]?></span><i class="material-icons prefix right collapsible-header grey-text text-darken-2">thumb_up</i></a>
											<a onclick="modalComment('<?php echo $json->json[$c1][0]?>','<?php echo $json->json[$c1][2]?>','<?php echo $json->json[$c1][3]?>','<?php echo $json->json[$c1][4]?>')" href="#modalComment" class="modal-trigger"><span class="number-comments<?php echo $json->json[$c1][0]?> right grey-text text-darken-1"><?php echo $json->json[$c1][6]?></span><i class="material-icons prefix right collapsible-header grey-text text-darken-2">comment</i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			
			<?php	
			}
		}
	}

	function replyCommentTemplate($jsonArray, $screen){
		$json = json_decode($jsonArray);
		if($screen == "desktop"){
			for($c1 = 0; $c1< count($json->json); $c1++){
				?>
				<div class="row">
					<div class="col s12 m12">
						<div class="card-panel grey lighten-4">
							<div class="row valign-wrapper">
								<div class="col s12 m2 img-forum">
									<img id="imgForum" src="<?php echo $json->json[$c1][1]?>" alt="" class="circle responsive-img"> 
								</div>
								<div class="col s12 m10">
									<h5><blockquote><?php echo $json->json[$c1][0]?></blockquote></h5>
									<span class="reply">
										<?php echo $json->json[$c1][2]?>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<?php
			}
		}
		else{
			for($c1 = 0; $c1< count($json->json); $c1++){
				?>
				<div class="row">
					<div class="col s12 m12">
						<div class="card-panel grey lighten-4">
							<div class="row">
								<div class="col s12 center-align">
									<img  src="<?php echo $json->json[$c1][1]?>" alt="" class="circle responsive-img"> 
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<h5><blockquote><?php echo $json->json[$c1][0]?></blockquote></h5>
									<span>
										<?php echo $json->json[$c1][2]?>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			<?php
			}
		}
	}

	function forumTemplate($jsonArray, $screen){
		$json = json_decode($jsonArray);

		if($screen == "desktop"){
			for($c1 = 0; $c1< count($json->json); $c1++){
				?>
				<div class="row">
					<div class="col s12 m11">
						<div class="card-panel grey lighten-4">
							<div class="row valign-wrapper">
								<div class="col s12 m2 img-forum">
									<img id="imgForum" src="<?php echo $json->json[$c1][2]?>" alt="" class="circle responsive-img"> 
								</div>
								<div class="col s12 m10">
									<h5><blockquote><?php echo $json->json[$c1][1]?></blockquote></h5>
									<span>
										<?php echo $json->json[$c1][3]?>
									</span>
									<div>
										<div class="container">
											<a onclick="modalForum('<?php echo $json->json[$c1][0]?>','<?php echo $json->json[$c1][1]?>','<?php echo $json->json[$c1][2]?>','<?php echo $json->json[$c1][3];?>')" class="modal-trigger" href="#modalForum">
												<span class="number-comments<?php echo $json->json[$c1][0]?> right grey-text text-darken-1"><?php echo $json->json[$c1][5]?></span>
												<i class="material-icons prefix right collapsible-header grey-text text-darken-2">comment</i>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<?php
			}
		}
		else{
			for($c1 = 0; $c1< count($json->json); $c1++){
			?>
			<div class="row">
				<div class="col s12 m12">
					<div class="card-panel grey lighten-4">
						<div class="row">
							<div class="col s12 center-align">
								<img  src="<?php echo $json->json[$c1][2]?>" alt="" class="circle responsive-img">
							</div>
						</div>
						<div class="row">
							<div class="col s12">
								<h5><blockquote><?php echo $json->json[$c1][1]?></blockquote></h5>
								<span>
									<?php echo $json->json[$c1][3]?>
								</span>
								<div>
									<div class="container">
										<a onclick="modalForum('<?php echo $json->json[$c1][0]?>','<?php echo $json->json[$c1][1]?>','<?php echo $json->json[$c1][2]?>','<?php echo $json->json[$c1][3];?>')" class="modal-trigger" href="#modalForum">
											<span class="number-comments<?php echo $json->json[$c1][0]?> right grey-text text-darken-1"><?php echo $json->json[$c1][5]?></span>
											<i class="material-icons prefix right collapsible-header grey-text text-darken-2">comment</i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<?php
			}
		}
	}

	function replyForumTemplate($jsonArray, $screen){
		$json = json_decode($jsonArray);
		
		if($screen == "desktop"){
			for($c1 = 0; $c1< count($json->json); $c1++){
			?>
			<div class="row">
				<div class="col s12 m12">
					<div class="card-panel grey lighten-4">
						<div class="row valign-wrapper">
							<div class="col s12 m2 img-forum">
								<img id="imgForum" src="<?php echo $json->json[$c1][1]?>" alt="" class="circle responsive-img"> 
							</div>
							<div class="col s12 m10">
								<h5><blockquote><?php echo $json->json[$c1][0]?></blockquote></h5>
								<span class="reply">
									<?php echo $json->json[$c1][2]?>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<?php
			}
		}
		else{
			for($c1 = 0; $c1< count($json->json); $c1++){
				?>
				<div class="row">
					<div class="col s12 m12">
						<div class="card-panel grey lighten-4">
							<div class="row">
								<div class="col s12 center-align">
									<img  src="<?php echo $json->json[$c1][1]?>" alt="" class="circle responsive-img"> 
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<h5><blockquote><?php echo $json->json[$c1][0]?></blockquote></h5>
									<span>
										<?php echo $json->json[$c1][2]?>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<?php
			}
		}
		
	}
?>