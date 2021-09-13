<?php require_once '../private/config/initialize.php'; ?>
<?php $page_title = 'Shorted URL - ' . SITE_NAME;
?>
<?php require_once(SHARED_PATH . '/public_doctypeHTML.include.php'); ?>
<?php 
	$id = $_GET['id'];

	$data = CreateShortURL::get_short_url_by_id($id);
	$data = array_shift($data);
 ?>
    <main>
		<?php require_once(SHARED_PATH . '/public_header.include.php'); ?>
		<section class="shorted_url_section">
			<div class="live_view_wrap_div">
				<h1 class="views_head">Total views</h1>
				<h4>We are showing total views for the URL ID <span id="aj_url_id"><?php echo h($data->short_url_id); ?></span></h4>
				<h4>You don't need to refresh this page because it is <span class="live_text">LIVE</span></h4>

				<div class="show_live_views_wrap">
					<span class="live_view_here"><?php echo h($data->views); ?></span>
				</div>

			</div>

			<h1 class="f_head">Your shorted URL</h1>
			<div class="shorted_url_text">
				<p class="shorted_url_name">shorturl.at/<?php echo $data->short_url_id; ?></p><p class="copy_to_clp">Copy to clipboard</p>
				<input type="hidden" value="shorturl.at/<?php echo $data->short_url_id; ?>" id="copy_this_text">
			</div>
			<div class="barcode_wrap">
				<h3 class="barcode_head">OR scan this barcode to open shorted URL</h3>
				<div class="barcode">
					<img src="phpqrcode/temp.php?id=<?php echo $data->id;?>" alt="barcode">
				</div>
			</div>

			<div class="more_actions_wrap">
				<div class="long_url">
					<span class="icon_wrap">
						<img src="images/url.png" alt="long url icon">
					</span>
					<span class="fit_content_width">Long URL : </span>
					<a href="" target="_blank" class="no_underline"><?php echo h($data->long_url); ?></a>
				</div>
				<div class="track_clicks">
					<span class="icon_wrap">
						<img src="images/click.png" alt="total clicks of a url icon">
					</span>
					<span class="fit_content_width">Track clicks : </span>
					<a href="" target="_blank" class="no_underline">Total clicks in real time</a>
				</div>

				<div class="gen_new">
					<span class="icon_wrap">
						<img src="images/new.png" alt="create new short url icon">
					</span>
					<a href="" target="_blank" class="no_underline">Create another short URL</a>
				</div>
			</div>

			<div class="share_url_wrap">
				<h2 class="share_wrap">Share with others : </h2>
				<section class="share_sec">
				<div>
					<img src="./images/whatsapp.png" class="w_icon" alt="Whatsapp icon">
					<a href="#" class="no_underline">Whatsapp</a>
				</div>
				<div>
					<img src="./images/telegram.png" class="w_icon" alt="Telegram icon">
					<a href="#" class="no_underline">Telegram</a>
				</div>
				<div>
					<img src="./images/facebook.png" class="w_icon" alt="Facebook icon">
					<a href="#" class="no_underline">Facebook</a>
				</div>
				</section>
			</div>

		</section>
    </main>
<?php require_once(SHARED_PATH . '/public_footer.include.php'); ?>
