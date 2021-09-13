<?php require_once '../private/config/initialize.php'; ?>
<?php $page_title = 'Registeration- ' . SITE_NAME;
?>
<?php require_once(SHARED_PATH . '/public_doctypeHTML.include.php'); ?>
    <main>
		<?php require_once(SHARED_PATH . '/public_header.include.php'); ?>
		<section class="short_url_section">
			<form action="" class="user_re_form">
				<div class="re_wrap">
				<h1 class="top_ead">Login</h1>
				<div class="username_div">
					<label for="username">Username or email ID</label>
					<input type="text" placeholder="write here" class="username" name="username" id="username">
				</div>
				<div class="paswd_div">
					<label for="paswd">Password</label>
					<input type="text" placeholder="write here" class="paswd" name="password" id="paswd">
				</div>
				<div class="submit_btn_div">
				<button class="register_btn">Login</button>
				<div class="loin_link"><a href="register.php" class="no_underline">Or register </a></div>
				</div>
			</div>


				<section class="oole_re_sec">
					
					<div class="oter_way_re">
					<div class="ooole_re_div"><div>re wit oole</div></div>
					<div class="ooole_re_div"><div>re wit facebook</div></div>
					</div>
				</section>
			</form>


			
		</section>


    </main>
<?php require_once(SHARED_PATH . '/public_footer.include.php'); ?>
