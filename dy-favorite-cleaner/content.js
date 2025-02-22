function addUnfavoriteButtons() {
  // 获取所有音乐项
  const musicItems = document.querySelectorAll('.bJgnsUt6');
  
  musicItems.forEach(item => {
    // 检查是否已经添加了按钮
    if (!item.querySelector('.quick-unfavorite-btn')) {
      // 创建取消收藏按钮
      const unfavoriteBtn = document.createElement('button');
      unfavoriteBtn.className = 'quick-unfavorite-btn';
      unfavoriteBtn.textContent = '取消收藏';
      
      // 添加点击事件
      unfavoriteBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // 模拟点击三个点按钮
        const moreBtn = item.querySelector('.sHCCp7my').closest('div');
        moreBtn.click();
        
        // 等待菜单出现
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // 获取当前音乐项对应的菜单
        const menu = item.querySelector('.syFdakw8');
        if (!menu) return;
        
        // 在当前菜单中查找取消收藏选项
        const unfavoriteOption = Array.from(menu.querySelectorAll('.eARycTWF'))
          .find(option => option.textContent === '取消收藏');
        
        if (unfavoriteOption) {
          unfavoriteOption.click();
          
          // 等待确认对话框出现
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // 查找最新出现的确认对话框
          const dialog = document.querySelector('.nO5ThkKp');
          if (dialog) {
            const confirmBtn = dialog.querySelector('.semi-button-primary.xwGCO8jQ');
            if (confirmBtn) {
              confirmBtn.click();
            }
          }
        }
      });
      
      // 将按钮添加到音乐项中的合适位置
      const controlsContainer = item.querySelector('.Hzh9CSFJ');
      controlsContainer.appendChild(unfavoriteBtn);
    }
  });
}

// 页面加载完成后添加按钮
document.addEventListener('DOMContentLoaded', addUnfavoriteButtons);

// 监听页面变化，处理动态加载的内容
const observer = new MutationObserver(() => {
  addUnfavoriteButtons();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
}); 