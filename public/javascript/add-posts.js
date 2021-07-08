//function to creat new post...
async function newFormHandler(event) {
    event.preventDefault();
  
    //get blog title...
    const title = document.querySelector('input[name="post-title"]').value;
    //get blog content...
    const post_content = document.querySelector('input[name="post-content"]').value;
    //create new response...
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //if response above is ok, new post visible...
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  //new post listener function...
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  