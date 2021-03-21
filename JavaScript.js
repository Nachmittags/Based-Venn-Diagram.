function VennDiagram()
    {
    //THIS FUNCTION SERVES TO DISCERN IF AN ARRAY IS EQUAL TO ANOTHER AND WILL BE USEFUL AS JAVASCRIPT NATIVE COMPARISONS SUCK.
    Array.prototype.isEqualTo=function(arr)
        {
        if(this.length!==arr.length) return false
        if(typeof arr!=="object") return false
        for(let x=0; x<this.length; x++)
            {
            if(typeof this[x] === "object")
                {
                if(typeof arr[x] !== "object")
                   {
                   return false
                   }
                if(!this[x].isEqualTo(arr[x]))
                    {
                    return false
                    }
                }
                else
                    {
                    if(this[x]!==arr[x])
                        {
                        return false
                        }
                    }
            }
        return true
        }
    //THIS SERVES TO TRACK ALL POSSIBLE COMBINATIONS MADE OUT OF A GIVEN SET OF ITENS (EG. ABC = A,B,C,AB,AC,BC,ABC)
    function possibilities(items) 
        {
        if (items.length === 1) { return [items] }
        const [head, ...tail] = items
        const otherPossibilites = possibilities(tail)
        return [
        [head], 
        ...otherPossibilites,
        ...otherPossibilites.map(other => [head, ...other])
        ]
        }
    //PUSH THE FN ARGUMENTS TO AN ARRAY. ERRORS COULD BE FOUND IN CASE CONTRARY.
    let arguments=[]
    for(let x=0; x<VennDiagram.arguments.length; x++)
        {
        arguments.push(VennDiagram.arguments[x])
        }
        //REMOVE EQUAL ITEMS FROM ARGUMENTS. OTHERWISE IT WOULD OUTPUT [[1,2,3,4,5]] AS DIFFERENT FROM [[1,2,3,4,5]] IN A FUNCTION ([[1,2,3,4,5]], [[1,2,3,4,5]])
let argumentscopy=[]
    for(let x=0; x<arguments.length; x++)
        {
        if(arguments[x]!==undefined)
            {
            argumentscopy.push(arguments[x])
            }
        for(let z=x+1; z<arguments.length; z++)
            {
            if(typeof arguments[x] === "object" && typeof arguments[z] === "object")
                {
                if(arguments[x].isEqualTo(arguments[z]))
                    {
                    delete arguments[z]
                    }
                }
                else
                    {
                    if(arguments[x] === arguments[z])
                        {
                        delete arguments[z]
                        }
                    }
            }
        }
    arguments=argumentscopy
    let combinations=[]
    //EACH ELEMENT OF THE FN MUST BE IDENTIFIED BY A NUMERICAL INDEX.
    for(let x=0; x<arguments.length; x++)
        {
        combinations.push(x)
        }
    //THE ARRAY COMBINATIONS WILL CONTAIN EVERY POSSIBLE COMBINATIONS FOR THE GIVEN FN INDEXES.
    combinations=possibilities(combinations)
    let output=[]
    //THIS ARRAY WILL STORE ALL ITEMS OF COMBINATIONS AS THE ARGUMENTS OF THE FUNCTION, HAVING THAT A NUMBER X IN COMBINATIONS WILL BE STORED AS ARGUMENTS[X] IN THE ARRAY.
    for(let x=0; x<combinations.length; x++)
        {
        output.push([])
        for(let z=0; z<combinations[x].length; z++)
            {
            output[output.length-1].push(arguments[combinations[x][z]])
            }
        }
    //FOR UNRELATED REASONS, IF THIS LOOP IS OMITTED, THE FUNCTION OUTPUT UNEXPECTED OUTCOMES.
    for(let x=0; x<output.length; x++)
        {
        if(output[x].length === 1)
            {
            output[x]=output[x][0]
            }
        }
    sizes=output.map(x=>x.length)
    //THIS PROCESS WILL TURN THE ARRAY OUTPUT INTO A SET OF MUTUAL ITEMS AMONG EVERY PRIMARY SETS OF THE FORMER ONE.
    for(let x=0; x<output.length; x++)
        {
        mutual=[]
        for(let y=0; y<output[x][0].length; y++)
            {
            matches=0
            indexes=[]
            for(let z=1; z<output[x].length; z++)
                {
                indexes.push([])
                for(let w=0; w<output[x][z].length; w++)
                    {
                    if(output[x][z][w] === output[x][0][y])
                        {
                        if(indexes[indexes.length-1].length === 0)
                            {
                            matches++
                            }
                        indexes[indexes.length-1].push(w);
                        }
                    }
                }
            if(sizes[x] === matches+1)
                {
                for(let z=0; z<indexes.length; z++)
                    {
                    for(let w=0; w<indexes[z].length; w++)
                        {
                        mutual.push(output[x][z+1][indexes[z][w]])
                        }
                    }
                }
            }
        if(combinations[x].length>1)
            {
            output[x]=[]
            for(let z=0; z<mutual.length; z++)
                {
                output[x].push(mutual[z])
                }
            }
        }
    //THIS WILL MAKE EACH ARRAY OF THE OUTPUT TO BE CONSISTED OF UNIQUE ELEMENTS.
    let outputcopy = []
    for(let x=0; x<output.length; x++)
        {
        outputcopy[x]=[]
        for(let y=0; y<output[x].length; y++)
            {
            if(output[x][y] !== undefined)
                {
                outputcopy[x].push(output[x][y])
                }
            for(let z=y+1; z<output[x].length; z++)
                {
                if(typeof output[x][y] === "object")
                    {
                    if(output[x][y].isEqualTo(output[x][z]))
                        {
                        delete output[x][z]
                        }
                    }
                    else
                        {
			if(output[x][y] === output[x][z])
				{
				delete output[x][z]
				}
                        }
                }
            }
        }
    output=outputcopy
    for(let x=0; x<combinations.length; x++)
        {
        if(combinations[x].length>1)
            {
            let start=combinations[x].slice(0,combinations[x].length-1)
            let end=combinations[x].slice(combinations[x].length-1)
            for(let z=0; z<combinations.length; z++)
                {
                if(start.isEqualTo(combinations[z]) || end.isEqualTo(combinations[z]))
                    {
                    for(let y=0; y<output[z].length; y++)
                        {
                        for(let w=0; w<output[x].length; w++)
                            {
			    if(typeof output[x][w] === "object")
				{
				if(output[x][w].isEqualTo(output[z][y]))
					{
					delete output[z][y]
					}
				}
				else
					{
                            		if(output[x][w] === output[z][y])
                                		{
                                		delete output[z][y]
                                		}
					}
                            }
                        }
                    }
                }
            }
        }
return output.map(x=> x.filter(z=>z!==undefined))
    }
