const aHerbs = [199,201,203,205,207,209,211,213,215,217,2485];

class Item {
    constructor(name, itemId) {
        this.name = name;
        this.itemId = itemId;

    }
}

class Herb extends Item{
    constructor(name, itemId) {
        super(name, itemId);
    }
}

window.onload = function() {
    let eOutput = document.getElementById('output');
    let aoHerbs = [];




    // eventhandlers

    // request - click ->
    $("#request").click(function(e) {
      e.preventDefault();

      for(let i=0; i < aHerbs.length; i++ ) {
          getItems(aHerbs[i],aoHerbs);
      }

      console.log(aoHerbs);

    })

    console.log(aoHerbs[0][0].itemId);


}


function makeObjects(ar, arherbs) {


    for (let i=0; i< ar.length; i++) {
        let herb = new Herb(ar[i][0], ar[i][1])
        arherbs.push(herb);

    }

}

function makeList(aoItems) {


    let eFragment = document.createDocumentFragment();
    let eUl = document.createElement('ul');

    for (let i=0; i<aoItems.length; i++) {
        let eLi = document.createElement('li');
        let eItem = document.createElement('ul');
        let eName = document.createElement('li');
        let eId = document.createElement('li');



        eName.innerText = aoItems[i].name;
        eId.innerText = aoItems[i].itemId;

        eItem.appendChild(eName);
        eItem.appendChild(eId);

        eLi.appendChild(eItem);

        eUl.appendChild(eLi);

    }


    eFragment.appendChild(eUl);

    return eFragment;
}

function getItems(id, ar) {

    if ((typeof(id === "number")) && id > 0 && id < 5000) {

        $.ajax({type: "GET",
            url: "request.php?itemId=" + id,
        })
            .done(function(data) {
                // check return
                if(data.length) {
                    let json = JSON.parse(data);

                    let id = json.item.id;
                    let name = json.item.name;

                    let herb = new Herb(id, name)



                    ar.push(herb);




                }
                }
            )
    }
}


