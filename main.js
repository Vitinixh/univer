// Spider-web animation and interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Spider animation effect on mouse move
  const spiderIcon = document.querySelector('.spider-icon');
  const container = document.querySelector('.container');
  
  if(container){
      container.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        
        spiderIcon.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${xPos}deg)`;
      });
  }
  
  // Animated logo effect
  const logo = document.querySelector('.logo');
    if(logo){
        logo.addEventListener('mouseover', () => {
            logo.style.textShadow = '0 0 10px #E53935, 0 0 20px #E53935';
          });
          
          logo.addEventListener('mouseout', () => {
            logo.style.textShadow = '2px 2px 0 #E53935';
          });
    }
  
  // Button web effect
  const btn = document.querySelector('.btn-web');
    if(btn){
        btn.addEventListener('click', () => {
            btn.classList.add('clicked');
            
            // Create web effect
            const webEffect = document.createElement('div');
            webEffect.classList.add('web-shot');
            document.body.appendChild(webEffect);
            
            setTimeout(() => {
              webEffect.remove();
              btn.classList.remove('clicked');
            }, 700);
          });
    }
  
  // Feature cards hover effect
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Rotate the web inside
      const web = card.querySelector('.spider-web');
      web.style.transform = 'rotate(180deg) scale(1.2)';
      web.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      const web = card.querySelector('.spider-web');
      web.style.transform = 'rotate(0) scale(1)';
    });
  });
  
  // Copy button functionality
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get text to copy from data attribute
      const textToCopy = button.getAttribute('data-text');
      
      // Use the navigator.clipboard API if available
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            // Change button appearance to indicate successful copy
            button.classList.add('copied');
            button.textContent = 'Copiado!';
            
            // Reset button after 2 seconds
            setTimeout(() => {
              button.classList.remove('copied');
              button.textContent = 'Copiar';
            }, 2000);
          })
          .catch(err => {
            console.error('Falha ao copiar texto: ', err);
            // Fallback to the old method if clipboard API fails
            fallbackCopyTextToClipboard(textToCopy, button);
          });
      } else {
        // Use the fallback method if clipboard API is not available
        fallbackCopyTextToClipboard(textToCopy, button);
      }
    });
  });
  
  // Fallback function to copy text to clipboard
  function fallbackCopyTextToClipboard(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    
    textarea.focus();
    textarea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (!successful) {
        throw new Error('Falha ao copiar texto utilizando método alternativo');
      }
      // Change button appearance to indicate successful copy
      button.classList.add('copied');
      button.textContent = 'Copiado!';
      
      // Reset button after 2 seconds
      setTimeout(() => {
        button.classList.remove('copied');
        button.textContent = 'Copiar';
      }, 2000);
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
      alert('Falha ao copiar texto: ' + err);
    } finally {
      document.body.removeChild(textarea);
    }
  }
});