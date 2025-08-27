window.toastList = function () {
  return {
      toasts: [],
      position: 'top-center',
      get positionClass() {
          const posMap = {
              'top-center': 'top-4 left-1/2 -translate-x-1/2',
              'top-right': 'top-4 right-4',
              'top-left': 'top-4 left-4',
              'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
              'bottom-right': 'bottom-4 right-4',
              'bottom-left': 'bottom-4 left-4',
          };
          return posMap[this.position] || posMap['top-center'];
      },
      listen() {
          window.addEventListener('toast', (e) => {
              const {
                  message,
                  type = 'alert-info',
                  timeout = 3000,
                  position = null,
                  icon = null
              } = e.detail;

              if (position) this.position = position;

              const id = Date.now();
              this.toasts.push({ id, message, type, icon, visible: true });

              setTimeout(() => {
                  this.toasts = this.toasts.map(t => t.id === id ? { ...t, visible: false } : t);
                  setTimeout(() => {
                      this.toasts = this.toasts.filter(t => t.id !== id);
                  }, 300);
              }, timeout);
          });
      },
      getIconForType(type) {
          switch (type) {
              case 'alert-success': return 'check';
              case 'alert-error': return 'x';
              case 'alert-warning': return 'exclamation-triangle';
              case 'alert-info':
              default: return 'info';
          }
      }
  };
};