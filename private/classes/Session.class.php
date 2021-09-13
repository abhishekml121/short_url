<?php
class Session {
  public $username;
  private $domain;
  public $MAX_LOGIN_AGE;

  public function __construct() {
    session_start();
    $this->MAX_LOGIN_AGE = time()+60*60*24*365; // 1 year
    $this->check_stored_login();
    $this->domain = get_domain_name_for_cookie();
  }

  public function login($admin) {
    if($admin) {
      // echo 'logging in............';
      // prevent session fixation attacks
      session_regenerate_id();
     $this->username = $admin->username;
     setcookie('username', $this->username, $this->MAX_LOGIN_AGE, '/', $this->domain , false);
    }
    return true;
  }

  public function is_logged_in() {
    return isset($this->username) && isset($_COOKIE['username']);
  }

  public function logout() {
    if (isset($_COOKIE['username'])) {
        setcookie('username', null, -1, '/', $this->domain);
        unset($_COOKIE['username']);
        unset($this->username);  
        return true;
    } else {
        return false;
    }
  }

  private function check_stored_login() {
    if(isset($_COOKIE['username'])) {
      $this->username = $_COOKIE['username'];
    }
  }

  public function message($msg="") {
    if(!empty($msg)) {
      // Then this is a "set" message
      $_SESSION['message'] = $msg;
      return true;
    } else {
      // Then this is a "get" message
      return $_SESSION['message'] ?? '';
    }
  }

  public function clear_message() {
    unset($_SESSION['message']);
  }
}

?>
