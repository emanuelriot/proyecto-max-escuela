<?php 
  $name_encode = htmlspecialchars($args['name'] ?? '');
?>

<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>Gracias por contactarte</title>
  <style>
    table, td, div, h1, p {
      font-family: Arial, sans-serif;
    }
    @media screen and (max-width: 530px) {
      .unsub {
        display: block;
        padding: 8px;
        margin-top: 14px;
        border-radius: 6px;
        background-color: #555555;
        text-decoration: none !important;
        font-weight: bold;
      }
      .col-lge {
        max-width: 100% !important;
      }
    }
    @media screen and (min-width: 531px) {
      .col-sml {
        max-width: 27% !important;
      }
      .col-lge {
        max-width: 73% !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;word-spacing:normal;background-color:#e9e9e9;">
  <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e9e9e9;">
    <table role="presentation" style="width:100%;border:none;border-spacing:0;">
      <tr>
        <td align="center" style="padding:0;">
          <table role="presentation" style="width:94%;max-width:600px; min-width:400px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
            <tr style="background-color: white;">
              <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                <a href="https://max.zixfox.com.ar" style="text-decoration:none;">
                  <img src="https://max.zixfox.com.ar/assets/images/mail.png" width="600" alt=""
                        style="width:100%;height:auto;display:block;border:none;text-decoration:none;">
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 30px 10px 30px;background-color:#ffffff;">
                <p style="margin:0; font-size: 25px; line-height: 30px; font-weight: bold;">
                  Hola
                  <?=$name_encode?>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 30px;background-color:#ffffff;">
                <p style="margin:0;">
                  Gracias por contactarnos, ahora ya tenemos toda la información que nos proporcionaste, 
                  evaluaremos tu caso y nos pondremos en contacto contigo lo mas pronto posible
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 30px;background-color:#ffffff;">
                <p style="margin:0; font-size: 13px; line-height: 20px;">
                  Nos escribiste esto: <?=$args['message']?>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 30px 50px 30px;background-color:#ffffff;">
                <p style="margin:0; text-align: center;">
                  <a href="https://max.zixfox.com.ar"
                      style="background: #b60307; text-decoration: none; padding: 13px 35px; color: #ffffff; border-radius: 99px; display:inline-block; mso-padding-alt:0;text-underline-color:#b60307; font-size: 17px;">
                      <span style="mso-text-raise:10pt;font-weight:bold;">Visitar pagina</span>
                  </a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
                <p style="margin:0;font-size:14px;line-height:20px;">
                  MAX &reg;, Salta, Argentina 2024
                  <br>
                  <a class="unsub" href="/"
                      style="color:#cccccc;text-decoration:underline;">Desuscribirse</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>