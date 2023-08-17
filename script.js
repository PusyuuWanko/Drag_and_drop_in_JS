/*****************************************
  *----------------------------------
  |  ThisStyleVersion: 1.1.1      |
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
      updateLocalStorageOrder();
    }

    return false;
  }

  // ドラッグ要素にイベントリスナーを追加
  draggableItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
  });

  // ローカルストレージの順番を更新
  function updateLocalStorageOrder() {
    const appLinkElements = document.querySelectorAll('.app_link');
    const order = Array.from(appLinkElements).map(item => item.outerHTML);
    localStorage.setItem('appOrder', JSON.stringify(order));
  }

  // ローカルストレージから順番を復元
  function restoreOrderFromLocalStorage() {
    const appOrder = JSON.parse(localStorage.getItem('appOrder'));
    if (appOrder) {
      const appContainer = document.querySelector('.yokoori');
      appContainer.innerHTML = appOrder.join('');
      addDragListeners(); // ドラッグアンドドロップのリスナーを追加
    }
  }

  // ドラッグ要素にイベントリスナーを再度追加
  function addDragListeners() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    draggableItems.forEach(item => {
      item.addEventListener('dragstart', dragStart);
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', drop);
    });
  }

  // ページ読み込み時にローカルストレージから順番を復元
  restoreOrderFromLocalStorage(); // ローカルストレージからの復元を行う

});