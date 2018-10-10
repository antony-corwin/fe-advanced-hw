'use strict';
/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/
const posts = [{
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-1.com'
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-2.com'
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-3.com'
  }
];

function createPostCard(obj) {
  // select element
  const html = document.querySelector("html");
  const body = document.querySelector("body");
  const root = document.querySelector("#root");
  // create element
  const post = document.createElement("div");
  const postImage = document.createElement("img");
  const postTitle = document.createElement("h2");
  const postText = document.createElement("p");
  const button = document.createElement("a");
  // add class
  post.setAttribute("class", "post");
  postImage.setAttribute("class", "post__image");
  postTitle.setAttribute("class", "post__title");
  button.setAttribute("class", "button");
  // add atribute
  postImage.setAttribute("src", obj.img);
  postImage.setAttribute("alt", '"post image"');
  button.setAttribute("href", obj.link);
  // paste textContent
  postTitle.textContent = obj.title;
  postText.textContent = obj.text;
  button.textContent = "Read more";
  // paste element on screen
  root.append(post);
  post.append(postImage);
  post.append(postTitle);
  post.append(postText);
  post.append(button);
  // add styles
  const img = document.querySelector("img");
  html.style.boxSizing = "border-box";

  body.style.fontFamily = "'Roboto', sans-serif";
  body.style.fontSize = "16px";

  post.style.width = "400px";
  post.style.padding = "8px";
  post.style.boxShadow = "0 0 4px 2px rgba(0, 0, 0, 0.2)";
  post.style.borderRadius = "2px";
  post.style.color = "#212121";
  post.style.margin = "0 auto";

  // img.style.display = "block";
  // img.style.maxWidth = "100%";
  // img.style.height = "auto";

  postImage.style.marginBottom = "8px";
  postImage.style.display = "block";
  postImage.style.maxWidth = "100%";
  postImage.style.height = "auto";

  // img.style.display = "block";
  // img.style.maxWidth = "100%";
  // img.style.height = "auto";

  postTitle.style.margin = "0";
  postTitle.style.marginBottom = "16px";
  postTitle.style.fontSize = "32px";
  postTitle.style.fontWeight = "500";

  postText.style.margin = "0";
  postText.style.marginBottom = "16px";
  postText.style.lineHeight = "1.5";

  button.style.position = "relative";
  button.style.display = "inline-block";
  button.style.border = "none";
  button.style.borderRadius = "3px";
  button.style.padding = "0 1.5em";
  button.style.verticalAlign = "top";
  button.style.fontSize = "15px";
  button.style.lineHeight = "2.8";
  button.style.color = "#222";
  button.style.textTransform = "uppercase";
  button.style.textAlign = "center";
  button.style.whiteSpace = "nowrap";
  button.style.fontFamily = "inherit";
  button.style.fontWeight = "500";
  button.style.textDecoration = "none";
  button.style.backgroundColor = "#fff";
  button.style.overflow = "hidden";
  button.style.zIndex = "0";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 2px 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)";
  button.style.transition = "background-color 0.3s, box-shadow 0.3s, opacity 0.3s, color 0.3s";
  button.style.webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
};

// function createPosts(arr) {
//   for (let el of arr) {
//     createPostCard(el);
//   };
// };

function createPosts(arr) {
  arr.map(el => createPostCard(el));
};

createPosts(posts);