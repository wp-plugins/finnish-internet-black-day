<?php
/**
 * Plugin Name: Finnish Internet black day
 * Plugin URI: https://www.facebook.com/events/160986290729976/
 * Description: Use this plugin to add Finnish Internet black day code by SC5 for your site. You can install and enable plugin now, code is activated only on campaing day 23.4. 
 * Version: 1.0
 * Author: Timi Wahalahti
 * Author URI: http://wahalahti.fi
 */


add_action('admin_init', 'mustapaiva_opt_init_fn' );
add_action('admin_menu', 'mustapaiva_opt_add_page_fn');

function mustapaiva_opt_init_fn(){
	register_setting('mustapaiva_options', 'mustapaiva_options', 'mustapaiva_options_validate' );
	add_settings_section('main_section', 'Settings', 'section_text_fn', __FILE__);
	add_settings_field('only', 'Code is active every day:<br><small>By default, code is active only 23.4.</small>', 'setting_string_only', __FILE__, 'main_section');
	add_settings_field('once', 'Show only once:<br><small>By default, visitor sees message only once</small>', 'setting_string_once', __FILE__, 'main_section');
	add_settings_field('title', 'Title:', 'setting_string_title', __FILE__, 'main_section');
	add_settings_field('big_text', 'Big text:', 'setting_string_big_text', __FILE__, 'main_section');
	add_settings_field('small_text', 'Small text:', 'setting_string_small_text', __FILE__, 'main_section');
	add_settings_field('coder', 'Show authors:<br><small>Be nice and show authors of code</small>', 'setting_string_coder', __FILE__, 'main_section');
}

function mustapaiva_opt_add_page_fn() {
	add_options_page('Finnish Internet black day', 'Finnish Internet black day', 'administrator', __FILE__, 'mustapaiva_opt_page_fn');
}


function  section_text_fn() {
	echo "<p>By default code is active only in campaing day 23.4. and each visitor sees message only once.</p>";
	echo '<p>If you want, you can modify texts in message.<br>You can use HTML-signs, for example link is added like this: &#60;a href="http://jarkea.fi/en" target="_blank"&#62;Common sense into copyright law&#60;/a&#62;. </p>';
	echo "<p>If you modify texts, activate code for every day and check modifications.</p>";
}

function setting_string_only() {
	$options = get_option('mustapaiva_options');
	echo "<input type='checkbox' name='mustapaiva_options[only]'' value='1'" .checked( isset( $options['only'] ), true, false ). "/>";
}

function setting_string_once() {
	$options = get_option('mustapaiva_options');
	echo "<input type='checkbox' name='mustapaiva_options[once]'' value='1'" .checked( isset( $options['once'] ), true, false ). "/>";
}

function setting_string_title() {
	$options = get_option('mustapaiva_options');
	echo "<input id='title' name='mustapaiva_options[title]' size='40' type='text' value='{$options['title']}' />";
}

function setting_string_big_text() {
	$options = get_option('mustapaiva_options');
	echo "<input id='big_text' name='mustapaiva_options[big_text]' size='40' type='text' value='{$options['big_text']}' />";
}

function setting_string_small_text() {
	$options = get_option('mustapaiva_options');
	echo "<input id='small_text' name='mustapaiva_options[small_text]' size='40' type='text' value='{$options['small_text']}' />";
}
function setting_string_coder() {
	$options = get_option('mustapaiva_options');
	echo "<input type='checkbox' name='mustapaiva_options[coder]'' value='1'" .checked( isset( $options['coder'] ), true, false ). "/>";
}

function mustapaiva_opt_page_fn() {
?>
	<div class="wrap">
		<div class="icon32" id="icon-options-general"><br></div>
		<h2>Internetin musta päivä</h2>
		<form action="options.php" method="post">
		<?php settings_fields('mustapaiva_options'); ?>
		<?php do_settings_sections(__FILE__); ?>
		<p class="submit">
			<input name="Submit" type="submit" class="button-primary" value="<?php esc_attr_e('Save Changes'); ?>" />
		</p>
		</form>
	</div>
<?php
}

function mustapaiva_options_validate($input) {
	$input['title'] =  wp_kses($input['title']);
	$input['big_text'] =  wp_kses($input['big_text']);
	$input['small_text'] =  wp_kses($input['small_text']);	
	return $input;
}

function mustapaiva_add() {
$options = get_option('mustapaiva_options');
echo "<script type='text/javascript' src='" .plugins_url( 'mustapaiva.js' , __FILE__ ). "' charset='UTF-8'></script>";

if (isset($options['only'] )) {
	$hihi = "onCampaignDayOnly: false, ";
}
if (isset( $options['once'] )) {
	$hihi .= "showOnlyOnce: false, ";
}
if (isset( $options['coder'] )) {
	$hihi .= "showCoders: true, ";
}
if (!empty($options['title'])) {
	$hihi .= "title: '". $options['title']. "', ";
}
if (!empty($options['big_text'])) {
	$hihi .= "bigText: '". $options['big_text']. "', ";
}
if (!empty($options['small_text'])) {
	$hihi .= "smallText: '". $options['small_text']. "'";
}

?>
<script>
copyrightCampaign({ <?php echo $hihi; ?> });
</script>
<?php
}
add_action('wp_head', 'mustapaiva_add');
?>