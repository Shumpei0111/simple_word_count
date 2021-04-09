
const word  = document.getElementById( 'countTarget' );
const saveBtn   = document.getElementById( 'saveBtn' );
const showField = document.getElementById( 'showField' );
const loadBtn   = document.getElementById( 'loadBtn' );

const entity = {
    wordCountValue: ''
};

function showCountLength( str, type ) {
    
    const txt = ( type === 'storage' ) ? getEscapeStr(str) : getEscapeStr( str.currentTarget.value );
    const txtNode = document.createTextNode( txt.length );

    showField.textContent = '';
    showField.appendChild( txtNode );
}

function showResult( str, type ) {
    const txt = ( type === 'storage' ) ? getEscapeStr( str ) : getEscapeStr( str.currentTarget.value );
    const txtNode = document.createTextNode( txt );

    document.getElementById( 'resultWord' ).textContent = '';
    document.getElementById( 'resultWord' ).appendChild( txtNode );
}

function getEscapeStr( str ) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    return str;
}

function saveWord() {
    entity.wordCountValue = word.value;
    chrome.storage.local.set( entity, () => {} )
}

function getSevedWord() {
    chrome.storage.local.get( entity, (value) => {
        if( value ) {
            word.value = value.wordCountValue;
            showCountLength( word.value, 'storage' );
            showResult( word.value, 'storage' )
        }
    } )
}

function init() {
    word.addEventListener( 'keyup', { target: word, handleEvent: showCountLength }, false );
    word.addEventListener( 'keyup', { target: word, handleEvent: showResult }, false );

    saveBtn.addEventListener( 'click', saveWord, false );

    loadBtn.addEventListener( 'click', getSevedWord, false );

    word.focus();
}

init();