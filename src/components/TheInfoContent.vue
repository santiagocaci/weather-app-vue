<script setup></script>

<template>
  <div class="text-info-content space-y-2">
    <div>
      <h2 class="text-xl">About:</h2>
      <p class="text-md">
        The App allows you to track current and future weather of cities of your
        choosing.
      </p>
    </div>
    <div>
      <h2 class="text-xl">How it works:</h2>
      <ol class="list-decimal list-inside text-md">
        <li>Search for your city by entering the name into search bar.</li>
        <li>
          Select a citi within the results, this will take you to the current
          weather for your selection.
        </li>
        <li>
          Track the city by clicking on the "+" icon in the top right. This will
          save the city to the view at a later time on the homepage.
        </li>
      </ol>
    </div>

    <div>
      <h2 class="text-xl">Removing a city:</h2>
      <p class="text-md">
        If you no longer wish track a city, simply select the city within the
        home page. At the bottom of the page, there will be am option to delete
        the city.
      </p>
    </div>

    <div>
      <div class="flex items-center space-x-4">
        <h2 class="text-xl">Contact me!</h2>
        <a
          class="text-3xl"
          href="https://github.com/santiagocaci"
          target="_blank"
        >
          <i class="fa-brands fa-github"></i>
        </a>
        <a
          class="text-3xl"
          href="https://linkedin.com/in/santiagocaci"
          target="_blank"
        >
          <i class="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>
</template>
