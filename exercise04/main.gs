# Costumes downloaded locally into the assets folder
costumes "assets/cat_a.svg", "assets/apple.svg";

var cars = 100;
var space_in_a_car = 4.0;
var drivers = 30;
var passengers = 90;

var cars_not_driven = 0;
var cars_driven = 0;
var carpool_capacity = 0;
var average_passengers_per_car = 0;

onflag {
    cars_not_driven = cars - drivers;
    cars_driven = drivers;
    carpool_capacity = cars_driven * space_in_a_car;
    average_passengers_per_car = passengers / cars_driven;

    switch_costume "cat_a";
    say "There are " & cars & " cars available.";
    wait 2;
    switch_costume "apple";
    say "There are only " & drivers & " drivers available.";
    wait 2;
    switch_costume "cat_a";
    say "We can transport " & carpool_capacity & " people today.";
    wait 2;
    say "We need to put about " & average_passengers_per_car & " in each car.";
}