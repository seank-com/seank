---
title: "Coding Style"
date: 2007-12-04T00:00
description: "Coding Styles can be an almost religious issue among..."
tags: 
    - technology
---

Coding Styles can be an almost religious issue among programmers and so I begin this post with a little trepidation but as I have been asked to document my particular coding style for my former team before I move on to a new team next week, I thought it would be best to do it as a post to my blog. In the over 20 years that I have been programming my style has only changed a few times. The first programming language I was ever formally taught was PASCAL so the issue of where to put curly braces has always been settled in my mind and I won't be discussing that here. What I do want to discuss is code flow. All through high school, college and my first several jobs in the computing industry I used a code flow like the following sample.

```
HRESULT DoBazThroughFooAndBar()
{
    IFooThings* pFooThings = NULL;
    HRESULT hr = GetFooThings(&pFooThings);
    if (SUCCEEDED(hr))
    {
        IBarThings* pBarThings = NULL;
        hr = pFooThings->GetBarThings(&pBarThings);
        if (SUCCEEDED(hr))
        {
            IBazThings* pBazThings = NULL;
            hr = pBarThings->GetBazThings(&pBazThings);
            if (SUCCEEDED(hr))
            {
                hr = pBazThings->DoSomethingProfound();
                pBazThings->Release();
            }
            pBarThings->Release():
        }
        pBarThings->Release();
    }
    return hr;
}
```

This type of code flow should be very familiar to every developer out there. The only disadvantage to using this type of style is that complex functions will typically nest to absurd levels and that can make the code very difficult to read. The first change to my coding style happened when I joined Microsoft back in 1994. I came to work on the MFC team. Unlike most development teams at the time, MFC had the distinction of shipping not only binaries, but the source as well. Consequently, the team a developed very rigorous style guidelines well before I arrived. These guidelines abhorred the kind of nesting demonstrated above and instead opted for a code flow like the following sample.

```
HRESULT DoBazThroughFooAndBar()
{
    CComPtr<IFooThings> pFooThings;
    HRESULT hr = GetFooThings(&pFooThings);
    if (FAILED(hr))
        return hr;
    
    CComPtr<IBarThings> pBarThings;
    hr = pFooThings->GetBarThings(&pBarThings);
    if (FAILED(hr))
        return hr;
    
    CComPtr<IBazThings> pBazThings;
    hr = pBarThings->GetBazThings(&pBazThings);
    if (FAILED(hr))
        return hr;
    
    hr = pBazThings->DoSomethingProfound();
    return hr;
}
```

The thinking here was that since MFC was a class library we can assume that the programmer is using C++. So any type that needs to be cleaned up after being used should be wrapped in a class so it's destructor can do the cleanup. This made the code much more readable. However, it had a few disadvantages. First, you often needed to implement one off classes to wrap types that needed to be cleaned up or alternately spend time looking for pre-existing wrappers for HANDLEs, HWNDs, HBITMAPs, not to mention memory that needed to be freed using delete, free, HeapFree or CoTaskMemFree. Because this isn't always practical you would often end up with one or two types that were not wrapped and needed to be cleaned up inside of each FAILED case. This became a problem when code analysis tools hit the scene. Around 2002, it became vogue at Microsoft for the test team to measure the success of their automated tests by using code coverage tools to analyzed the percentage of code that was exercised. I remember one tester being particularly frustrated with me because he couldn't get better than 40% of my covered because of all the error handling code to handle errors that almost never happened. The other disadvantage came when you needed to debug your application or instrument it with tracing since it was virtually guaranteed that you would have way more than one exit point within the function. So if you had a macro for tracing that needed to be placed at the beginning of every function and another one at the end, you would need to invoke that macro at every return. Consequently, this style was not popular outside of MFC. Instead most teams opted for a code flow like the following sample.

```
HRESULT DoBazThroughFooAndBar()
{
    IFooThings* pFooThings = NULL;
    HRESULT hr = GetFooThings(&pFooThings);
    if (FAILED(hr))
        goto Cleanup;

    IBarThings* pBarThings = NULL;
    hr = pFooThings->GetBarThings(&pBarThings);
    if (FAILED(hr))
        goto Cleanup;

    IBazThings* pBazThings = NULL;
    hr = pBarThings->GetBazThings(&pBazThings);
    if (FAILED(hr))
        goto Cleanup;

    hr = pBazThings->DoSomethingProfound();

Cleanup:
    if (pBazThings != NULL)
        pBazThings->Release();
    
    if (pBarThings != NULL)
        pBarThings->Release():
    
    if (pBarThings != NULL)
        pBarThings->Release();

    return hr;
}
```

Those who practice the art of programming and can trace their methodological lineage back to the school of the great [Edsger W. Dijkstra](http://en.wikipedia.org/wiki/Edsger_W._Dijkstra) will immediately chaff at the thought of using gotos in their code. Consequently, many have sought other code flows that solve the same problems without the gotos. One in particular looks like the following sample.

```
HRESULT DoBazThroughFooAndBar()
{
    IFooThings* pFooThings = NULL;
    IBarThings* pBarThings = NULL;
    IBazThings* pBazThings = NULL;
    
    HRESULT hr = S_OK;
    do
    {
        hr = GetFooThings(&pFooThings);
        if (FAILED(hr))
            break;

        hr = pFooThings->GetBarThings(&pBarThings);
        if (FAILED(hr))
            break;

        hr = pBarThings->GetBazThings(&pBazThings);
        if (FAILED(hr))
            break;

        hr = pBazThings->DoSomethingProfound();
    }
    while(false);
    
    if (pBazThings != NULL)
        pBazThings->Release();

    if (pBarThings != NULL)
        pBarThings->Release():

    if (pBarThings != NULL)
        pBarThings->Release();

    return hr;
}
```

While it very cleverly coaxes a goto out of a loop, I dislike it for exactly that reason. A loop should be used for looping, not faking a goto semantic. Since code is read many more times than it is written, I believe a programmer should strive to make the code as obvious and readable as possible. Using the above trick may confuse the casual observer and risks making it hard to maintain even for the seasoned developer. Notice particularly that variables that require cleanup must be declared outside the loop.
I finally converted (see I told you it was religious) over to the style I use today after I realized that it addresses all the issues above. Not only that but using my style will get you near 100% code coverage as the successful execution path hits every line of code. Here is a sample using my current style.

```
HRESULT DoBazThroughFooAndBar()
{
   IFooThings* pFooThings = NULL;
   HRESULT hr = GetFooThings(&pFooThings);
   
   IBarThings* pBarThings = NULL;
   if (SUCCEEDED(hr))
       hr = pFooThings->GetBarThings(&pBarThings);

   IBazThings* pBazThings = NULL;
   if (SUCCEEDED(hr))
       hr = pBarThings->GetBazThings(&pBazThings);

   if (SUCCEEDED(hr))
       hr = pBazThings->DoSomethingProfound();

   if (pBazThings != NULL)
       pBazThings->Release();

   if (pBarThings != NULL)
       pBarThings->Release();

   if (pBarThings != NULL)
       pBarThings->Release();
       
   return hr;
}
```
