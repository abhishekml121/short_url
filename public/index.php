<?php require_once '../private/config/initialize.php'; ?>
<?php $page_title = SITE_NAME;
?>
<?php require_once(SHARED_PATH . '/public_doctypeHTML.include.php'); ?>
    <main>
		<?php require_once(SHARED_PATH . '/public_header.include.php'); ?>
		<section class="short_url_section">
			<?php if (empty($_GET)) { ?>
			<form action="" class="sort_url_form" id="short_url_form">
				<h1 class="top_ead">Paste the URL to be shortened</h1>
				<input type="search" placeholder="Write any URL" class="lon_url" name="long_url">
				<div class="custom_checkbox_div">
					<div class="custom_url_ead">Do you need a custom URL (link) ?</div>
					<div class="wrapped_cutom_inputs">
					<input type="checkbox" name="custom_url_checkbox" class="custom_url_checkbox">
					<div class="domainname">https://www.shorturl.com/</div>
					<input type="text" name="short_url_id" placeholder="ABCD" class="custom_url_name" disabled>
					</div>
				</div>
				<div class="submit_btn_div">
				<button class="submit_btn_short_url" data-src="short_url_form">get Short URL</button>
				</div>
			</form>
		<?php }elseif(isset($_GET['id'])) {?>
			<?php 
				$id = $_GET['id'];
				$data = CreateShortURL::get_short_url_by_id($id);
				$data = array_shift($data);
			 ?>
			<div class="redirect_to_long_url">
				<div><img src="./images/loading.svg" alt="loading gif"></div>
				<p>Please wait ! </p><p>You are being redirected to main URL</p>
			</div>
			<?php 
			// increasing views of short URL.
			CreateShortURL::increase_views_of_short_url($id);

			 ?>
				<?php //redirect_to($data->long_url); ?>

		<?php } ?>
		</section>
    </main>
<?php require_once(SHARED_PATH . '/public_footer.include.php'); ?>
