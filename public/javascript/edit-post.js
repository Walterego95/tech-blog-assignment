//edit post...
async function editFormHandler(event) {
  event.preventDefault();

  //title changes...
  const title = document.querySelector('input[name="post-title"]').value.trim();

  //content changes...
  const post_content = document.querySelector('input[name="post-content"]').value.trim();

  //id number for post...
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  //after take to dashboard see new post...
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

//submit button listener...
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
