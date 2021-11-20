<?php

$file = $_GET['file'];

if ( file_exists($file) ) {

  header('Content-Description: File Transfer');
  header('Content-Type: application/octet-stream');
  header('Content-Disposition: attachment; filename="' . basename($file) . '"');
  header('Expires: 0');
  header('Cache-Control: must-revalidate');
  header('Pragma: no-cache');
  header('Content-Length: ' . filesize($file));
  readfile($file);
  // unlink($file);
  exit;
  
}

?>