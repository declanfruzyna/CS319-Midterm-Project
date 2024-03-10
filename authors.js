fetch('authors.json')
  .then(response => response.json())
  .then(data => {
    const authorsContainer = document.querySelector('.authors-row');
    data.authors.forEach(author => {
      const authorCard = `
        <div class="author-card">
            <div class="author-info">
                <img src="${author.image}" alt="${author.name}" class="author-img">
                <h2>${author.name}</h2>
                <p>${author.role}</p>
                <p>${author.bio}</p>
                <p class="subtext">${author.class}</p>
                <p class="subtext">I can be found at, ${author.contact}</p>
                <p class="subtext">I last worked on this site ${author.date}</p>
            </div>
        </div>
      `;
      authorsContainer.innerHTML += authorCard;
    });
  });