class Gallery {
  constructor(gallery) {
    this.gallery = gallery;
    if (!this.gallery) {
      throw new Error('There is no gallery!');
    }
    this.modal = document.querySelector('.myModal');
    this.images = Array.from(this.gallery.querySelectorAll('img'));
    this.prevButton = document.querySelector('.prev');
    this.nextButton = document.querySelector('.next');
    this.currentImg;
    this.startX;
    this.currentX;
    this.hasChange = false;

    this.images.forEach((img) => {
      img.addEventListener('click', (e) => {
        this.showImage(e.currentTarget);
      });
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.showImage(e.currentTarget);
        }
      });
    });

    // bindings
    this.handleClickEvents = this.handleClickEvents.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    // this.mouseDownHandler = this.mouseDownHandler.bind(this);
    // this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.touchendHandler = this.touchendHandler.bind(this);
    this.touchstartHandler = this.touchstartHandler.bind(this);
  }

  // mouseDownHandler(e) {
  //   if (!e.target.matches('button')) {
  //     console.log('mousedown');
  //     this.startX = e.pageX;
  //     window.addEventListener('mousemove', this.handleMouseMove);
  //     window.addEventListener('mouseup', this.mouseUpHandler);
  //   }
  // }

  // mouseUpHandler() {
  //   console.log('mouseup');
  //   window.removeEventListener('mousemove', this.handleMouseMove);
  //   window.removeEventListener('mouseup', this.mouseUpHandler);
  // }

  touchstartHandler(e) {
    if (!e.target.matches('button')) {
      console.log('touchstart');
      this.startX = e.touches[0].clientX;
      console.log('this.startX', this.startX);
      this.modal.addEventListener('touchmove', this.handleTouchMove);
    }
  }

  touchendHandler() {
    console.log('touchend');
    this.hasChange = false;
    this.modal.removeEventListener('touchmove', this.handleTouchMove);
  }

  openModal() {
    console.log('openmodal');
    this.modal.classList.add('open');
    this.modal.addEventListener('click', this.handleClickEvents);
    // this.modal.addEventListener('mousedown', this.mouseDownHandler);
    // this.modal.addEventListener('mouseup', this.mouseUpHandler);
    this.modal.addEventListener('touchstart', this.touchstartHandler);
    this.modal.addEventListener('touchend', this.touchendHandler);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  closeModal() {
    console.log('closemodal');
    this.modal.classList.remove('open');
    this.modal.removeEventListener('click', this.handleClickEvents);
    // this.modal.removeEventListener('mousedown', this.mouseDownHandler);
    // this.modal.removeEventListener('click', this.mouseUpHandler);
    this.modal.removeEventListener('touchstart', this.touchstartHandler);
    this.modal.removeEventListener('touchend', this.touchendHandler);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  showImage(el) {
    if (!el) {
      console.info('no image!');
      return;
    }
    // show iamge / update modal
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('p').textContent = el.dataset.description;
    this.currentImg = el;
    // console.log(el, this.currentImg);

    if (!this.modal.classList.contains('open')) {
      this.openModal();
    }
  }

  showNextImg() {
    if (this.currentImg) {
      const next =
        this.currentImg.nextElementSibling || this.gallery.firstElementChild;
      this.showImage(next);
    }
  }

  showPrevImg() {
    if (this.currentImg) {
      const previous =
        this.currentImg.previousElementSibling || this.gallery.lastElementChild;
      this.showImage(previous);
    }
  }

  // handleEvents

  handleClickEvents(e) {
    // console.log(this);
    const { target } = e;
    switch (target) {
      case this.modal:
        this.closeModal();
        break;
      case this.prevButton:
        this.showPrevImg();
        break;
      case this.nextButton:
        this.showNextImg();
        break;
      default:
        break;
    }
  }

  handleKeyUp(e) {
    // console.log(this)
    const { key } = e;
    // console.log(key);
    switch (key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowRight':
        this.showNextImg();
        break;
      case 'ArrowLeft':
        this.showPrevImg();
        break;
      default:
        break;
    }
  }

  // handleMouseMove(e) {
  //   this.currentX = e.pageX;
  //   const diff = this.currentX - this.startX;
  //   if (diff > 0 && diff > 50) {
  //     this.showPrevImg();
  //     this.startX = this.currentX;
  //   } else if (diff < 0 && diff < -50) {
  //     this.showNextImg();
  //     this.startX = this.currentX;
  //   }
  // }

  handleTouchMove(e) {
    if (!this.hasChange) {
      // e.preventDefault();
      console.log('touchmove');
      this.currentX = e.touches[0].clientX;
      const diff = this.currentX - this.startX;
      if (diff > 50) {
        this.showPrevImg();
        this.hasChange = true;
        console.log('currentX', this.currentX);
        // this.startX = this.currentX;
      } else if (diff < -50) {
        this.showNextImg();
        this.hasChange = true;
        console.log('currentX', this.currentX);
        // this.startX = this.currentX;
      }
    }
  }
}

// Ejecution
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
