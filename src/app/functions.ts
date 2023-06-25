export function newPost() {
  const topic = (document.getElementById("topic-box") as HTMLInputElement).value;
  (document.getElementById("topic-box") as HTMLInputElement).value = "";
  
  const content = (document.getElementById("content-box") as HTMLInputElement).value;
  (document.getElementById("content-box") as HTMLInputElement).value = "";

  
}