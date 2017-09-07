import Trie from './Trie'
import words from './words'

let trie = new Trie()

const $wordInput = $('#word-input')
const $searchBtn = $('#search-btn')
const $suggestWordsDisplay = $('#word-suggest-box')
const $suggestList = $('#suggest-list')

$(document).ready(() => {
  trie.populate(words)
  $wordInput.focus()
})

$suggestList.on('click', '.suggestions', suggestWord)

$wordInput.on('input', () => {
  if ($wordInput.val() === '') {
    clearSuggestBox()
  } else {
    clearSuggestBox()
    searchWord()
  }
})

function suggestWord() {
  let selectedWord = $(this).text()
  trie.select(selectedWord)
  clearSuggestBox()
  $wordInput.val(selectedWord)
  searchWord()
  $wordInput.focus()
}

function searchWord() {
  let suggestedWord = $wordInput.val().toLowerCase()
  let wordList = trie.suggest(suggestedWord)
  for (let i = 0; i < 10; i++) {
    if (wordList[i] !== undefined) {
      $('#suggest-list').append(`<li class='suggestions'>${wordList[i]}</li>`)
    }
  }
}

function clearSuggestBox() {
  var suggestions = $('.suggestions')
  for (let i = 0; i < suggestions.length; i++) {
    suggestions[i].remove()
  }
}
