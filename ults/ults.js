
function zoom (img) { //宽高同比缩放
  let zoom = 100 / img.width;
  return {
    width: img.width * zoom,
    height: img.height * zoom
  };
}

function imgQueryUrl (word, page, row) {
  //&word=%E7%8C%AB&pn=60&rn=30
  let url = "https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj";
  let urlTmp = url + "&word=" + word
    + "&pn=" + (page * row - row)
    + "$rn=" + row;
  console.log(urlTmp);
  return urlTmp;
}

//解压图片路径
function imgUrlEncode (imgUrl) {
  let encryption = {
    "w": "a",
    "k": "b",
    "v": "c",
    "1": "d",
    "j": "e",
    "u": "f",
    "2": "g",
    "i": "h",
    "t": "i",
    "3": "j",
    "h": "k",
    "s": "l",
    "4": "m",
    "g": "n",
    "5": "o",
    "r": "p",
    "q": "q",
    "6": "r",
    "f": "s",
    "p": "t",
    "7": "u",
    "e": "v",
    "o": "w",
    "8": "1",
    "d": "2",
    "n": "3",
    "9": "4",
    "c": "5",
    "m": "6",
    "0": "7",
    "b": "8",
    "l": "9",
    "a": "0",
    "_z2C\\$q": ":",
    "_z&e3B": ".",
    "AzdH3F": "/"
  };
  //需要匹配的属性值
  let enKey = Object.keys(encryption);
  //打包正则
  let reg = new RegExp(enKey.join("|")+"|.","g");
  let psw;
  //匹配到的数据
  let code = [];

  while (psw = reg.exec(imgUrl)){
    if (psw[0] === "_z2C$q"){
      psw[0] = "_z2C\\$q";
    }
    code.push(encryption[psw] ? encryption[psw] : psw[0]);
    //console.log("psw=" + psw + "; psw0=" + psw[0]);
  }
  //console.log(imgUrl);
  //console.log(code);
  return code.join("");
}

export { zoom, imgQueryUrl, imgUrlEncode }