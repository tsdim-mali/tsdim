// ============================================================
// REGLAGES DE CONNEXION
// ============================================================
// METHODE 1 (optionnelle) : clients dans un tableau Google Sheets.
// Collez ici l'adresse de votre Apps Script (elle finit par /exec).
// Laissez "" pour utiliser la liste ci-dessous (METHODE 2).
const URL_COMPTES = "";

// METHODE 2 : liste d'acces deja prets, classes par duree.
// "u" = identifiant | "h" = mot de passe chiffre (illisible ici)
// "r" = role : "super" (tout faire) ou "admin" (voir et suivre)
// "j" = duree en jours a partir de la 1ere connexion
//       (ou "m" = duree en MINUTES, ou "e":"AAAA-MM-JJ" pour une date fixe)
// Pour couper un acces : supprimez sa ligne.
// Pour changer la duree d'un acces : modifiez son "j".
const COMPTES = [
  // ---- SUPER ADMIN (vous) ----
  {"u":"admin","h":"itTgtaV27TeagGFo2YSVo31gVP51IZJRoqns4lxhLZQ","r":"admin","e":"2036-12-31"},
  // ---- SUPER ADMIN (ne jamais supprimer) ----
  {"u":"superadmin","h":"tpciyanRqtiKkDWpBJUzLvGt1ar_n8pk_2hXjVEblk0","e":"2099-12-31","r":"super"},
  // ---- 15 JOURS (15 jours) ----
  {"u":"j15-01","h":"pUwGe2L2Ewl4euV2u9XSI2pNoXCH3p6QrmQmmnlK9uU","j":15},
  {"u":"j15-02","h":"GXvdk_5eQhBUQMoFaiIkciNwtjyrHk4T-jail6pR9ZI","j":15},
  {"u":"j15-03","h":"QPCDLWRQEclxa0UZ62gCmAfTvNQ1rwypMadfXBiRdSM","j":15},
  {"u":"j15-04","h":"eipK_EIBKqI3Flvw7eUTGKMWBVESEZ-EoB-V9-I2OFo","j":15},
  {"u":"j15-05","h":"Zl6_HjzV6XEmEUYWVWBessavCchK_AgQWngUcZtMvGA","j":15},
  {"u":"j15-06","h":"-LtapAKeiE_pXpHBbNnE7YtCpN-yjWG3Oz6vEcaQWiU","j":15},
  {"u":"j15-07","h":"mxULbO0BZM-W9zhr6v3m3RhLydk1vXnsd2jRNnyplvg","j":15},
  {"u":"j15-08","h":"hYcL5fUkNCz7ovUAIa52-5c9UzJBz8GupOEJQ-DYSjw","j":15},
  {"u":"j15-09","h":"YdvKw2AwPP1ZSrb1aFLWzGIBExSgPSLlW9kSpgsF3p8","j":15},
  {"u":"j15-10","h":"NkewlOcOnE_SXp9lHk1oo7vbGsCTpxYzSmwZrv3rZnY","j":15},
  // ---- 1 MOIS (30 jours) ----
  {"u":"m1-01","h":"rGbBZoUr1XjyoHLLqqvS1Sr9kKzdZaixHD2AJvfWo6s","j":30},
  {"u":"m1-02","h":"LZLqQO5RbyvGieRp_PbU8AXLYfSfWPvLbVROrvIdM94","j":30},
  {"u":"m1-03","h":"pD57mMyofULEZQfMfyxtE_r6pGydZlg99w0uS-YC5rA","j":30},
  {"u":"m1-04","h":"PURVngQmtc7xKTWap22h0B-Bxr6fSn4bhfKMkwcg95Y","j":30},
  {"u":"m1-05","h":"DTADP9qH7Sh9zpEA8XxBrK_wS6NaDfoppOYid4OJzuw","j":30},
  {"u":"m1-06","h":"32UHWoVlHKGJa6CnkiJsNspHt1gIW1O8oxm6atugvUY","j":30},
  {"u":"m1-07","h":"ENT41bpsOjmeBVow3fknk4kiXe-dc7kJckpMANS9Lqk","j":30},
  {"u":"m1-08","h":"4eW510W1_pfvD4FfCLEsdMp3PRQk8-RHiajiEjqaQKE","j":30},
  {"u":"m1-09","h":"3y7FZaikIaN1yWhFPEtibkg9afS5ieXSJO0RGoviX6E","j":30},
  {"u":"m1-10","h":"rBvQ26lAgUGrEmDktxLrClxFuBy9XTXdbZnoJNVy9rg","j":30},
  {"u":"m1-11","h":"iWPfzh6AqpXDaP7Vj3bW79ddYvVfta0Uu7sWKNXNwns","j":30},
  {"u":"m1-12","h":"kblZbCrYimkdza1MgPp8MyGG-O-mD6aGXCpqNrQfmY8","j":30},
  {"u":"m1-13","h":"Rs6as86WV4UPameADH0tMrrxwNUgYDvtXwEDhIj6reo","j":30},
  {"u":"m1-14","h":"deaFvOBuu5f_7JQwNgr5o-0xyJmWeaMNniXirFoctK4","j":30},
  {"u":"m1-15","h":"o97jW6JtP1g64mxYHGn0zbva6L-yqPz_Ta-3eoS1cW4","j":30},
  {"u":"m1-16","h":"xHAainY5OmP9uicWZ7S5Nn-_cCHP54OWz1sVz2nICf0","j":30},
  {"u":"m1-17","h":"5ZuHUNVCdzK1ls1QpSmZ28yWhoUhkh-VwIVmkqoWu3k","j":30},
  {"u":"m1-18","h":"qmhQ5kPm53GkuvrGYm0uiGv00yuVn-tpmQ7eqqiQx4k","j":30},
  {"u":"m1-19","h":"gYGq-FNbDFf9LQWxuUqYFDexT1f2XyD09hWajkdtxEM","j":30},
  {"u":"m1-20","h":"PzsCg41I1z7lxbsTdbgJlXD9Fwn-Uf6Y6XDFfkKF0AQ","j":30},
  // ---- 2 MOIS (60 jours) ----
  {"u":"m2-01","h":"u-D2DiTtnz7GLSDaCWkkhx9I23Exxvk7kS4FT94rq24","j":60},
  {"u":"m2-02","h":"md3VSzg_dSF_x_Ik81RxkhBZxkitldiXa08Gi6g853w","j":60},
  {"u":"m2-03","h":"Gx_JA2IgDcYWpZOkC-90uuunhYzVyrhZrJz79Npy32Q","j":60},
  {"u":"m2-04","h":"qzX_ngHlNlDowbbw7-0O9YdUbT4GDrrdHNupg1IpGKQ","j":60},
  {"u":"m2-05","h":"yNQ9HG5nWYFWJY5ssH5_PM5gsR0XhFI_BPyQc9P1jmk","j":60},
  {"u":"m2-06","h":"e3L75tZeQ3h2kHgdbKhryRGWTJGAiKsJwbijQO--8Wo","j":60},
  {"u":"m2-07","h":"Ui0q5vmsrcALejM-2iZXRAJcQFE07683o780Z0Yl6h0","j":60},
  {"u":"m2-08","h":"KW3o-pqXQVQgvwpETy6HaXn21fPxo3stx245dHYEn_o","j":60},
  {"u":"m2-09","h":"anHpYAZlSjMN9EUdnox9_-iqt0TYcwY6_Ii1TTj9AaU","j":60},
  {"u":"m2-10","h":"l8mg0ysIH1yJTu71w-RtJ2z2Sj9MhogYP-iwNW1PfNo","j":60},
  // ---- 3 MOIS (90 jours) ----
  {"u":"m3-01","h":"ojjVKhHvmvNrt5wwFbis_xguz5ILP9wWPYANvnoKGU8","j":90},
  {"u":"m3-02","h":"QEC_C6DW6GKBqzRi-ohNAopTiSJ5inVGnJI2rSxBIWw","j":90},
  {"u":"m3-03","h":"LGjwhWiWfIFW2YnwqksC0Q5ejpqAJ2KQvuPQWe2eybM","j":90},
  {"u":"m3-04","h":"YxOD4L3pDhLguBUoYnKAZmxIVFI1sscWBO94K8g1EkI","j":90},
  {"u":"m3-05","h":"pKEz9l6HuOYqPAwt8Af9qev8-_2khCEMRL1rVsWQv4E","j":90},
  {"u":"m3-06","h":"cLOw3vclkZg9ibQSwxmc6KmlGzG1DjL4y_-v9ACqo4k","j":90},
  {"u":"m3-07","h":"kabJFoabOauc5eS5KzZ-6_8ZNu2rBQ5Qi63ERMV33lc","j":90},
  {"u":"m3-08","h":"Jzgqru3hSNUMJKbrEuBzJEOsrom_EevWny5rd9uJ938","j":90},
  {"u":"m3-09","h":"exNkdxKSqMMHw6_mNJXYh8eOJSVMI7rODeOqUcsF4z8","j":90},
  {"u":"m3-10","h":"bfT0hrMVeFutUXx-OV74GQCnoJGjs6yMCBeKOWI0SNQ","j":90},
  // ---- 6 MOIS (180 jours) ----
  {"u":"m6-01","h":"2xp7L-3mslzFqg7J3V5NogXMQSG5-5LisQIHTqYjdnE","j":180},
  {"u":"m6-02","h":"q8nx54kaG2M8PLGrFSgwrvoioxnwT1Q7hdiBSC8ihpo","j":180},
  {"u":"m6-03","h":"7ibSrgZa_H0AQPLcsJzy7RutJ-zMwwyLewaDeYPSmlM","j":180},
  {"u":"m6-04","h":"EPd95iMQECkGoyIdpgXVJwt-bCaiNisXX7ujRksVsm0","j":180},
  {"u":"m6-05","h":"yENeudufiBP-WJa3o1TKwd7_JRQWZRJSqAnEhkdcu98","j":180},
  // ---- 1 AN (365 jours) ----
  {"u":"an-01","h":"JjeLITW9QT4fjoIW-u9-e3xTrszDmVARJ1KzHOAEHxE","j":365},
  {"u":"an-02","h":"Hu1xEYrag3CyIK6BOyecWj3yBWEewM2-mCgO1NPjNHw","j":365},
  {"u":"an-03","h":"TGnJPyYK4_l8OCgTwxxlA_KO50kH2HnNG6P-MDVA7kU","j":365},
  {"u":"an-04","h":"zegmZ5UJNN2v5ZDQ8DIK9MpaBPzMmgxVWgu1EFrl-uE","j":365},
  {"u":"an-05","h":"xhSc5_Xb2kPyHPjY_y8TziGtTyExp9RmOL12deQos6I","j":365},
  // ---- ESSAI 10 MIN (10 minutes a partir de la 1ere connexion) ----
  {"u":"e10-01","h":"FRgGRm-BWHj_VwLwsALNTlFwtmIXdngaOkLDTFussso","m":10},
  {"u":"e10-02","h":"ADsCt3OIni6O13ZyBUrkl-B5zpubdvc1H9t_mN6DyRI","m":10},
  {"u":"e10-03","h":"-IHEB1f78Zw9QydVaglQv3zcJxqpEHBif1tAiJyYJWM","m":10},
  {"u":"e10-04","h":"vRvvohQi8SznFmlfMAaXNUXghxI_NU4ke6kfVP1NEEU","m":10},
  {"u":"e10-05","h":"cJZXBWhu_DA4H3dIqgIA7uTK9OkJUeY8Iyc1bgWGZhU","m":10},
  {"u":"e10-06","h":"ZlkGMStUCIXiNvlvZoEhScWl7du0XATJM84Ov_TWyC8","m":10},
  {"u":"e10-07","h":"zp7Q7FWpyd2Ysu20lUEG2x50abKKrDRSylApD0dKD9U","m":10},
  {"u":"e10-08","h":"GrDGPPyYcxn4t3tD5lY9lrvl5ShTG6RMg9EiLGGqkQQ","m":10},
  {"u":"e10-09","h":"xzJdpqKP7PAyKI1OFz9qT2gBTcWayweRE4cRb-G1Ntw","m":10},
  {"u":"e10-10","h":"xpRa1eYKafe5-WjO4KDEBR0jxnVVVxPrOp83llXfLx0","m":10},
  // ---- ESSAI 30 MIN (30 minutes a partir de la 1ere connexion) ----
  {"u":"e30-01","h":"mmbV2z2OgB4-E7ErdP5I9XZPtzdZAQzzVNeTD0LVldE","m":30},
  {"u":"e30-02","h":"nrOzanQ74PbAX_3zXe-xtg66e61Ti1YWprhpaDcrj_g","m":30},
  {"u":"e30-03","h":"se1YZ0yHMNXTjQOLt-HFBlKjGGzHpf7VCCKIIDo30Yk","m":30},
  {"u":"e30-04","h":"Ls7wVtgMmqq0ZoidHFGGH-cNEPnvF65EkuoDJZRfq6c","m":30},
  {"u":"e30-05","h":"jossCUBKHmxy9oF8HlgrYfgIi4oIqtaqX5F67m8R_jg","m":30},
  {"u":"e30-06","h":"UZVLn25NV3jAZ0jH3Xv8cnjkQ3ox0uBw8TuUP5xmyL0","m":30},
  {"u":"e30-07","h":"HIj-l-yVKyBf1XYZImkG98kqMZOa6wBin4Ur5kL4jqg","m":30},
  {"u":"e30-08","h":"YoZlUIiCaLgI_-8fUx6Qo1ide0KXqkLe9qMsO1RLal0","m":30},
  {"u":"e30-09","h":"08LGUmPiEroUooC_oVigZFHFdQgO92xgFW3kIkTWfjA","m":30},
  {"u":"e30-10","h":"OeGaWa4A8CKcjdn0SEsf0S4pp2JbKuIQtI9dHXw4wuo","m":30},
];

// Utilise seulement si la liste COMPTES est vide
const JOUR_EXPIRATION = "2026-10-31";
