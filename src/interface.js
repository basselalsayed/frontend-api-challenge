const app = {
  pages: [],
  show: new Event('show'),
  update_feed: function() {
    fetch("https://chitter-backend-api.herokuapp.com/peeps")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        else {
          return response.json();
        }
      })
      .then((data) => {
        console.log('data', typeof data, data[0]);
        var peep_div = document.getElementsByClassName('peeps_body');
        console.log(peep_div.innerHTML);
        arr = []
        arr.push(`<article class='peeps'>`)
        data.forEach((peep, index) => {
          console.log(typeof peep.user.handle, peep.user.handle)
         arr.push(
            `<article class="peep" id='${peep.id}'>
            <header>
              <h2>${peep.user.handle}</h2>
            </header>
            <section class="peep-text">
              <p>${peep.body}</p>
            </section>
            <footer>
              <span>U+1F9E1 ${peep.likes.length}<span>
              <p>
                Peeped at
                <time datetime="${peep.created_at}"></time>
                by Tom.
              </p>
            </footer>
            </article>`)
        });
        arr.push('</article>');
        peep_div.innerHTML = arr.join();
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      })
  },
  init: function() {
    app.update_feed();
    app.pages = document.querySelectorAll('.page');
    app.pages.forEach((pg)=>{
      pg.addEventListener('show', app.pageShown);
    })
    document.querySelectorAll('.nav_link').forEach((link)=>{
      link.addEventListener('click', app.nav);
    })
    history.replaceState({}, 'Home', '#home');
    window.addEventListener('hashchange', app.poppin)
  },
  nav: function(ev){
    ev.preventDefault();
    let currentPage = ev.target.getAttribute('data-target');
    var id = location.hash.split("#notes/")[1]
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
    console.log(currentPage)
    history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById(currentPage).dispatchEvent(app.show)
  },
  pageShown: function(ev){
    console.log('Page', ev.target.id, 'just shown');
  },
  poppin: function(ev){
    console.log(location.hash, 'popstate event')
  },
  load_peeps: function() {
    JSON.parse(peep) 
  }
}

document.addEventListener('DOMContentLoaded', app.init);