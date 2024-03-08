document.getElementById("askButton").addEventListener('click',function(){

    //get data from input and construct the prompt
    question = "Please guess the movie's name from this description (gives three guesses):"+document.getElementById('question').value;

    //api
    const apiKey = "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"

    fetch("https://api.openai.com/v1/chat/completions",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${apiKey}`
        },
        body:JSON.stringify({
            model:"gpt-4",
            messages:[{
                role:"user",
                content:question
            }]
        })
    })
    .then(response => response.json())
    .then((data)=>{
        console.log("--->",data);
        // Assuming 'choices' is not used for chat/completions; instead, use the 'choices' structure for accessing the response
        if (data && data.choices && data.choices.length > 0 && data.choices[0].message) {
            document.getElementById('response').textContent = data.choices[0].message.content.trim();
        } else {
            document.getElementById('response').textContent = "No response from API.";
        }
    })
    .catch((error)=>{
        console.log("Error",error)
        document.getElementById('response').textContent="Error"+error;
    });//end of fetch

})//end of program