<?php 
class CreateShortURL extends DatabaseObject {
	static protected $table_name = "url";
  static protected $db_columns = ['id', 'username','long_url', 'short_url_id', 'views', 'date', 'time'];
  public $id;
  public $username;
  public $long_url;
  public $short_url_id;
  public $is_logged_in = false;
  public $views = 0;
  public $short_url_id_length = 15;

  public function __construct($args=[]) {
    $this->long_url = $args['long_url'] ?? '';
    $this->short_url_id = $args['short_url_id'] ?? '';
    $this->username = $_COOKIES['username'] ?? '';
    $this->date = date('Y-m-j');
    $this->time = date('H:i:s');
    // $this->is_logged_in = $session->is_logged_in();
  }

  public function generate_unique_note_id(){
    $this->short_url_id = self::filter_quick_note_id(generate_random_id(8));
    if($this->is_short_url_exists($this->short_url_id)){
      // echo 'short url exists';
      $this->generate_unique_note_id();
    }
  }

  // public static function delete_note($user_id, $note_id){
  //   $sql = "DELETE FROM " . static::$table_name . " ";
  //   $sql .= "WHERE user_id='" . self::$database->escape_string($user_id) . "' ";
  //   $sql .= "AND note_id='" . self::$database->escape_string($note_id) . "' ";
  //   $sql .= "LIMIT 1";
  
  //   $result = self::$database->query($sql);
  //   return $result;
  // }
  // 

  public static function count_previous_views($short_url_id){
    $sql ='SELECT views FROM '. static::$table_name;
    $sql .=' WHERE short_url_id ='. "'".self::$database->escape_string($short_url_id) ."'";
    return static::find_by_sql_without_object($sql);
  }

  //increase views of short url
  public static function increase_views_of_short_url($short_url_id){
    $short_url = self::filter_quick_note_id(trim($short_url_id));
    $count_previous_views = self::count_previous_views(trim($short_url_id));
    if($count_previous_views == null){
      return false;
    }
      $sql ='UPDATE '. static::$table_name;
      $sql .=' SET views='. self::$database->escape_string(++$count_previous_views['views']);
       $sql .=' WHERE short_url_id ='. "'".self::$database->escape_string($short_url_id) ."'";
      return self::$database->query($sql); // true or false
  }

  // get short url by short url ID.
  public static function get_short_url_by_id($id){
    $sql = 'SELECT * FROM '. static::$table_name;
    $sql .= ' WHERE short_url_id = '. "'". self::$database->escape_string($id) ."'";
    return static::find_by_sql($sql);
  }

  public function is_short_url_exists($short_url_id){
    $sql = 'SELECT short_url_id FROM '. static::$table_name;
    $sql .= ' WHERE short_url_id = '. "'". self::$database->escape_string(trim($short_url_id)) ."'";
    $result = static::find_by_sql_without_object($sql);
    if(!empty($result)){
      return true;
    }else{
      return false;
    }
  }

/*  public function get_views($id){
    $sql = 'SELECT views FROM ' .static::$table_name;
    $sql .= ' WHERE id=' . "'".self::$database->escape_string($id) ."'";
    return static::find_by_sql_without_object($sql);
  }*/

  public static function filter_quick_note_id($note_id){
    $pattern = '/[\w]+/';
    preg_match_all($pattern, $note_id, $matched);
		return implode(array_shift($matched));
  }

/*
  public function check_note_ip_address(){
    if(has_presence($this->ip_address)){
      $check = $_SERVER['REMOTE_ADDR'] === $this->current_note_ip_address;

      if($check){
        return true;
      }
      return false;
  }
  return false;
}*/
 
 /* public function is_admin($note_id){
    // check note_id is stored in DB.
    if($this->is_note_id_exists($note_id)){
      // Match client ip-address with stored ip-address in DB.
      // if true then current user is owner of current note.
      // then do update for existing note instead of creating a new note.
      $is_admin = $this->check_note_ip_address();
      if($is_admin){
        $this->is_admin = true;
        return true;
      }else{
        $this->is_admin = false;
        return false;
      }
    }
    return NULL; // must send NULL
  }
  */

public function validate() {
  $this->errors = [];
  
  if(is_blank($this->long_url)) {
    $this->errors['main_url'] = "Main URL cannot be blank.";
  }elseif (!is_valid_url($this->long_url)) {
    $this->errors['main_url'] = "URL is not correct. Please write a valid URL.";
  }

  if(is_blank($this->short_url_id)) {
    $this->generate_unique_note_id();
  }elseif($this->is_short_url_exists($this->short_url_id)){
    $this->errors['short_url_id'] = "Short URL ID already exixts. Please give different Short URL ID.";
  }elseif (!has_length($this->short_url_id, array('max' => $short_url_id_length))) {
    $this->errors['short_url_id'] = "Short URL ID can not more than 15 charcters.";
  }

  return $this->errors;
}

}
 ?>
