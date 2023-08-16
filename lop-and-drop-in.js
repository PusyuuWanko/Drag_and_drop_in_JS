/*****************************************
  *----------------------------------
  |  ThisStyleVersion: 1.0.0      |
  |  © 2021-2023 By Pusyuu        |
  |  LastUpdate: 2023-08-17       |
  |  License: MIT License         |
  |  (^U^)PusyuuJsDesu            |
----------------------------------*
******************************************/

document.addEventListener('DOMContentLoaded', function () {
  const draggableItems = document.querySelectorAll('.draggable-item');

  let draggedItem = null;

  // ドラッグ開始時の処理
  function dragStart(e) {
    draggedItem = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  // ドラッグ中の処理
  function dragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  // ドロップ時の処理
  function drop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (draggedItem !== this) {
      draggedItem.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  // ドラッグ要素にイベントリスナーを追加
  draggableItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
  });
});